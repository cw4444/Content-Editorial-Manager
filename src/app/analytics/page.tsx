"use client";

import {
  BarChart3,
  TrendingUp,
  Eye,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Zap,
  Target,
} from "lucide-react";
import { performanceData, contentPieces } from "@/lib/data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AnalyticsPage() {
  const published = contentPieces.filter(c => c.status === "published" && c.performance);

  const totalViews = published.reduce((s, c) => s + (c.performance?.views || 0), 0);
  const avgEngagement = published.reduce((s, c) => s + (c.performance?.engagement || 0), 0) / Math.max(published.length, 1);
  const totalShares = published.reduce((s, c) => s + (c.performance?.shares || 0), 0);
  const avgConversion = published.reduce((s, c) => s + (c.performance?.conversion || 0), 0) / Math.max(published.length, 1);

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold">Content Performance Analytics</h1>
        <p className="text-text-muted text-sm mt-1">
          AI-driven insights that inform content optimization and planning decisions
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Views", value: totalViews.toLocaleString(), change: "+18%", up: true, icon: Eye },
          { label: "Avg Engagement", value: `${avgEngagement.toFixed(1)}%`, change: "+2.3pts", up: true, icon: TrendingUp },
          { label: "Total Shares", value: totalShares.toLocaleString(), change: "+24%", up: true, icon: Share2 },
          { label: "Avg Conversion", value: `${avgConversion.toFixed(1)}%`, change: "-0.5pts", up: false, icon: Target },
        ].map(({ label, value, change, up, icon: Icon }) => (
          <div key={label} className="bg-surface rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted">{label}</span>
              <Icon size={16} className="text-text-muted" />
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <div className={`flex items-center gap-1 text-xs mt-1 ${up ? "text-success" : "text-red-400"}`}>
              {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {change} vs last period
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Views by Newsroom - Area Chart */}
        <div className="col-span-2 bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold mb-4">Views by Newsroom (Weekly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData.weeklyViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#1e1e2e", border: "1px solid #334155", borderRadius: "8px", fontSize: "12px" }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Area type="monotone" dataKey="consumer" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
              <Area type="monotone" dataKey="enterprise" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Area type="monotone" dataKey="brand" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
              <Area type="monotone" dataKey="product" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Breakdown - Pie Chart */}
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={performanceData.channelBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="percentage"
                nameKey="channel"
              >
                {performanceData.channelBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#1e1e2e", border: "1px solid #334155", borderRadius: "8px", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {performanceData.channelBreakdown.map((ch, i) => (
              <div key={ch.channel} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-text-muted flex-1">{ch.channel}</span>
                <span className="font-medium">{ch.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Content + AI Insights */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Top Performing Content</h3>
          </div>
          <div className="divide-y divide-border">
            {performanceData.topContent.map((content, i) => (
              <div key={i} className="p-4 hover:bg-surface-2 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{content.title}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Eye size={12} /> {content.views.toLocaleString()} views</span>
                      <span className="flex items-center gap-1"><TrendingUp size={12} /> {content.engagement}% engagement</span>
                    </div>
                  </div>
                  {content.trend === "up" ? <ArrowUpRight size={18} className="text-success" /> :
                   content.trend === "down" ? <ArrowDownRight size={18} className="text-red-400" /> :
                   <Minus size={18} className="text-text-muted" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-primary/20 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-primary-light" />
            <h3 className="font-semibold">AI Performance Insights</h3>
          </div>
          <div className="space-y-4">
            {[
              {
                insight: "How-to guides outperform all other formats by 3x",
                recommendation: "Increase how-to content from 15% to 30% of monthly output. Create a templated workflow to scale production.",
                impact: "Projected +40% engagement lift",
              },
              {
                insight: "Enterprise content has highest share rate but lowest volume",
                recommendation: "Allocate 2 additional pieces/week to enterprise newsroom. Focus on original research and data-driven formats.",
                impact: "Projected +$200K pipeline contribution",
              },
              {
                insight: "Email channel conversion declining week-over-week",
                recommendation: "A/B test subject lines and CTAs. Segment lists by engagement tier. Review send cadence — possible fatigue.",
                impact: "Risk: -15% email-attributed revenue if unaddressed",
              },
              {
                insight: "Social shares spike on data visualization content",
                recommendation: "Create monthly infographic series. Repurpose existing blog data into shareable visual formats.",
                impact: "Projected +60% social reach",
              },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-surface-2 rounded-lg">
                <p className="text-sm font-medium mb-1">{item.insight}</p>
                <p className="text-xs text-text-muted">{item.recommendation}</p>
                <p className="text-xs text-primary-light mt-1">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
