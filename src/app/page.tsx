"use client";

import {
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  FileText,
  Eye,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Zap,
  Calendar,
} from "lucide-react";
import { contentPieces, newsrooms, weeklyCalendar, performanceData, type Newsroom } from "@/lib/data";
import { generateEditorialDecisions, getCalendarRecommendations } from "@/lib/ai-engine";

const statusColors: Record<string, string> = {
  draft: "bg-gray-500/20 text-gray-400",
  review: "bg-yellow-500/20 text-yellow-400",
  approved: "bg-blue-500/20 text-blue-400",
  published: "bg-green-500/20 text-green-400",
};

const priorityColors: Record<string, string> = {
  urgent: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const calendarTypeColors: Record<string, string> = {
  meeting: "border-l-blue-400",
  review: "border-l-yellow-400",
  publish: "border-l-green-400",
  planning: "border-l-purple-400",
};

export default function Dashboard() {
  const decisions = generateEditorialDecisions();
  const calendarRecs = getCalendarRecommendations();

  const stats = {
    total: contentPieces.length,
    published: contentPieces.filter(c => c.status === "published").length,
    inReview: contentPieces.filter(c => c.status === "review").length,
    urgent: contentPieces.filter(c => c.priority === "urgent").length,
    totalViews: performanceData.topContent.reduce((s, c) => s + c.views, 0),
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Editorial Command Center</h1>
          <p className="text-text-muted text-sm mt-1">
            AI-managed editorial operations across {Object.keys(newsrooms).length} newsrooms
          </p>
        </div>
        <div className="text-right text-sm">
          <p className="text-text-muted">Today</p>
          <p className="font-medium">Monday, March 23, 2026</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Active Content", value: stats.total, icon: FileText, color: "text-primary-light" },
          { label: "Published", value: stats.published, icon: CheckCircle2, color: "text-success" },
          { label: "In Review", value: stats.inReview, icon: Clock, color: "text-yellow-400" },
          { label: "Urgent Items", value: stats.urgent, icon: AlertTriangle, color: "text-red-400" },
          { label: "Total Views", value: stats.totalViews.toLocaleString(), icon: Eye, color: "text-blue-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-surface rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted">{label}</span>
              <Icon size={16} className={color} />
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* AI Decisions - Main Column */}
        <div className="col-span-2 space-y-6">
          {/* AI Editorial Decisions */}
          <div className="bg-surface rounded-xl border border-border">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Zap size={18} className="text-primary-light" />
              <h2 className="font-semibold">AI Editorial Decisions</h2>
              <span className="ml-auto text-xs text-text-muted">{decisions.length} active decisions</span>
            </div>
            <div className="divide-y divide-border">
              {decisions.map((decision, i) => (
                <div key={i} className="p-4 hover:bg-surface-2 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 px-2 py-0.5 rounded text-xs font-medium border ${priorityColors[decision.priority]}`}>
                      {decision.priority}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{decision.action}</p>
                      <p className="text-xs text-text-muted mt-1">{decision.rationale}</p>
                      <p className="text-xs text-primary-light mt-2">{decision.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsroom Overview */}
          <div className="bg-surface rounded-xl border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">Newsroom Overview</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              {(Object.entries(newsrooms) as [Newsroom, typeof newsrooms[Newsroom]][]).map(([key, nr]) => {
                const nrContent = contentPieces.filter(c => c.newsroom === key);
                const published = nrContent.filter(c => c.status === "published").length;
                return (
                  <div key={key} className="bg-surface-2 rounded-lg p-4 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nr.color }} />
                      <h3 className="font-medium text-sm">{nr.name}</h3>
                      <span className="ml-auto text-xs text-text-muted">{nr.teamSize} people</span>
                    </div>
                    <p className="text-xs text-text-muted mb-3">{nr.description}</p>
                    <div className="flex gap-3 text-xs">
                      <span>{nrContent.length} pieces</span>
                      <span className="text-success">{published} published</span>
                      <span className="text-yellow-400">{nrContent.filter(c => c.status === "review").length} in review</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Pipeline */}
          <div className="bg-surface rounded-xl border border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold">Content Pipeline</h2>
              <div className="flex gap-2">
                {["draft", "review", "approved", "published"].map(s => (
                  <span key={s} className={`px-2 py-1 rounded text-xs ${statusColors[s]}`}>
                    {s} ({contentPieces.filter(c => c.status === s).length})
                  </span>
                ))}
              </div>
            </div>
            <div className="divide-y divide-border">
              {contentPieces.slice(0, 8).map(piece => (
                <div key={piece.id} className="p-3 px-4 hover:bg-surface-2 transition-colors flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${statusColors[piece.status]}`}>
                    {piece.status}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{piece.title}</p>
                    <p className="text-xs text-text-muted">{piece.newsroom} · {piece.type} · Due {piece.dueDate}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs border ${priorityColors[piece.priority]}`}>
                    {piece.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Weekly Calendar */}
          <div className="bg-surface rounded-xl border border-border">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Calendar size={18} className="text-primary-light" />
              <h2 className="font-semibold text-sm">This Week</h2>
            </div>
            <div className="divide-y divide-border">
              {weeklyCalendar.map(day => (
                <div key={day.day} className="p-3">
                  <p className="text-xs font-medium text-text-muted mb-2">{day.day} {day.date}</p>
                  <div className="space-y-1.5">
                    {day.items.map((item, i) => (
                      <div key={i} className={`border-l-2 ${calendarTypeColors[item.type]} pl-2 py-0.5`}>
                        <p className="text-xs font-medium">{item.title}</p>
                        <p className="text-xs text-text-muted">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Calendar Recommendations */}
          <div className="bg-surface rounded-xl border border-primary/20">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Zap size={16} className="text-primary-light" />
              <h2 className="font-semibold text-sm">AI Scheduling Recommendations</h2>
            </div>
            <div className="p-3 space-y-2">
              {calendarRecs.slice(0, 4).map((rec, i) => (
                <div key={i} className="flex gap-2 text-xs p-2 bg-surface-2 rounded-lg">
                  <span className="text-primary-light mt-0.5 shrink-0">→</span>
                  <span className="text-text-muted">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Content */}
          <div className="bg-surface rounded-xl border border-border">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <TrendingUp size={18} className="text-success" />
              <h2 className="font-semibold text-sm">Top Performing</h2>
            </div>
            <div className="divide-y divide-border">
              {performanceData.topContent.map((content, i) => (
                <div key={i} className="p-3 hover:bg-surface-2 transition-colors">
                  <p className="text-xs font-medium mb-1">{content.title}</p>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {content.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 size={12} /> {content.engagement}%
                    </span>
                    <span className="ml-auto">
                      {content.trend === "up" ? <ArrowUpRight size={14} className="text-success" /> :
                       content.trend === "down" ? <ArrowDownRight size={14} className="text-red-400" /> :
                       <Minus size={14} className="text-text-muted" />}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
