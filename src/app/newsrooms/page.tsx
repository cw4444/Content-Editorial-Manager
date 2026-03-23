"use client";

import { useState } from "react";
import {
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Edit3,
  Zap,
} from "lucide-react";
import { newsrooms, contentPieces, type Newsroom } from "@/lib/data";
import { calculateNewsroomHealth } from "@/lib/ai-engine";

export default function NewsroomsPage() {
  const [selected, setSelected] = useState<Newsroom>("consumer");
  const health = calculateNewsroomHealth(selected);
  const nrContent = contentPieces.filter(c => c.newsroom === selected);
  const nr = newsrooms[selected];

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold">Newsroom Management</h1>
        <p className="text-text-muted text-sm mt-1">
          AI-managed editorial newsrooms with real-time health monitoring
        </p>
      </div>

      {/* Newsroom Selector */}
      <div className="grid grid-cols-4 gap-4">
        {(Object.entries(newsrooms) as [Newsroom, typeof newsrooms[Newsroom]][]).map(([key, n]) => {
          const active = key === selected;
          const h = calculateNewsroomHealth(key);
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`p-4 rounded-xl border text-left transition-all ${
                active ? "bg-surface border-primary/50 ring-1 ring-primary/20" : "bg-surface border-border hover:border-border/80"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: n.color }} />
                <span className="font-medium text-sm">{n.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{n.contentCount} pieces</span>
                <span className={`text-xs font-bold ${h.score >= 80 ? "text-success" : h.score >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                  {h.score}% health
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Newsroom Detail */}
        <div className="col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: nr.color }} />
              <h2 className="text-lg font-bold">{nr.name} Newsroom</h2>
              <span className="ml-auto flex items-center gap-1 text-sm text-text-muted">
                <Users size={14} /> {nr.teamSize} team members
              </span>
            </div>
            <p className="text-sm text-text-muted mb-4">{nr.description}</p>
            <div className="grid grid-cols-4 gap-4">
              {["draft", "review", "approved", "published"].map(status => {
                const count = nrContent.filter(c => c.status === status).length;
                const icons: Record<string, typeof FileText> = { draft: Edit3, review: Clock, approved: CheckCircle2, published: TrendingUp };
                const Icon = icons[status] || FileText;
                return (
                  <div key={status} className="bg-surface-2 rounded-lg p-3 text-center">
                    <Icon size={16} className="mx-auto mb-1 text-text-muted" />
                    <p className="text-lg font-bold">{count}</p>
                    <p className="text-xs text-text-muted capitalize">{status}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content in this Newsroom */}
          <div className="bg-surface rounded-xl border border-border">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Active Content</h3>
            </div>
            <div className="divide-y divide-border">
              {nrContent.map(piece => (
                <div key={piece.id} className="p-4 hover:bg-surface-2 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{piece.title}</p>
                      <p className="text-xs text-text-muted mt-1">{piece.brief}</p>
                      <div className="flex gap-2 mt-2">
                        {piece.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-surface-3 rounded text-xs text-text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        piece.status === "published" ? "bg-green-500/20 text-green-400" :
                        piece.status === "review" ? "bg-yellow-500/20 text-yellow-400" :
                        piece.status === "approved" ? "bg-blue-500/20 text-blue-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>{piece.status}</span>
                      <p className="text-xs text-text-muted mt-1">Due {piece.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
              {nrContent.length === 0 && (
                <p className="p-4 text-sm text-text-muted">No content in this newsroom</p>
              )}
            </div>
          </div>
        </div>

        {/* Health & AI Insights */}
        <div className="space-y-6">
          {/* Health Score */}
          <div className="bg-surface rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={18} className="text-primary-light" />
              <h3 className="font-semibold text-sm">AI Health Assessment</h3>
            </div>
            <div className="text-center mb-4">
              <div className={`text-5xl font-bold ${
                health.score >= 80 ? "text-success" : health.score >= 60 ? "text-yellow-400" : "text-red-400"
              }`}>
                {health.score}
              </div>
              <p className="text-xs text-text-muted mt-1">Overall Health Score</p>
            </div>
            <div className="space-y-3">
              {health.factors.map(factor => (
                <div key={factor.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{factor.name}</span>
                    <span className={factor.score >= 70 ? "text-success" : factor.score >= 50 ? "text-yellow-400" : "text-red-400"}>
                      {factor.score}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        factor.score >= 70 ? "bg-success" : factor.score >= 50 ? "bg-yellow-400" : "bg-red-400"
                      }`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{factor.insight}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-surface-2 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-primary-light mt-0.5 shrink-0" />
                <p className="text-xs text-text-muted">{health.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface rounded-xl border border-border p-5">
            <h3 className="font-semibold text-sm mb-3">Quick Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Avg. time to publish", value: "3.2 days" },
                { label: "Content utilization", value: "78%" },
                { label: "Cross-channel reach", value: "156K" },
                { label: "Engagement rate", value: "11.2%" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-text-muted">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
