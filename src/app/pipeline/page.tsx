"use client";

import {
  Zap,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  Clock,
  ArrowRight,
} from "lucide-react";
import { trendSignals, contentPieces } from "@/lib/data";

const sentimentColors = {
  positive: "text-success bg-success/10",
  negative: "text-red-400 bg-red-400/10",
  neutral: "text-blue-400 bg-blue-400/10",
};

const urgencyColors = {
  urgent: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export default function PipelinePage() {
  // AI-generated reactive-to-proactive transformation
  const reactiveItems = trendSignals.filter(s => s.urgency === "urgent" || s.urgency === "high");
  const proactiveItems = trendSignals.filter(s => s.urgency === "medium" || s.urgency === "low");

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold">Reactive → Proactive Story Pipeline</h1>
        <p className="text-text-muted text-sm mt-1">
          AI detects signals, assesses relevance, and recommends editorial responses — shifting from reactive production to proactive storytelling
        </p>
      </div>

      {/* Pipeline Visualization */}
      <div className="bg-surface rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold flex items-center gap-2">
            <Zap size={18} className="text-primary-light" />
            Signal Detection Pipeline
          </h2>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Urgent Response</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400" /> Strategic Opportunity</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> Proactive Planning</span>
          </div>
        </div>

        {/* Flow: Signal → Analysis → Content Action */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="text-xs font-medium text-text-muted mb-3 uppercase tracking-wider">Signals Detected</h3>
            <div className="space-y-3">
              {trendSignals.map(signal => (
                <div key={signal.id} className="bg-surface-2 rounded-lg p-3 border border-border hover:border-primary/20 transition-colors">
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`px-1.5 py-0.5 rounded text-xs border ${urgencyColors[signal.urgency]}`}>
                      {signal.urgency}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-xs ${sentimentColors[signal.sentiment]}`}>
                      {signal.sentiment}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{signal.title}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
                    <span>{signal.source}</span>
                    <span>·</span>
                    <span>Relevance: {signal.relevance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium text-text-muted mb-3 uppercase tracking-wider">AI Analysis & Angle</h3>
            <div className="space-y-3">
              {trendSignals.map(signal => (
                <div key={signal.id} className="bg-surface-2 rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={12} className="text-primary-light" />
                    <span className="text-xs text-primary-light font-medium">AI Recommendation</span>
                  </div>
                  <p className="text-xs text-text-muted">{signal.suggestedAngle}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-primary-light">
                    <ArrowRight size={12} />
                    <span>View content action</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium text-text-muted mb-3 uppercase tracking-wider">Content Actions</h3>
            <div className="space-y-3">
              {trendSignals.map((signal, i) => {
                const actions = [
                  { action: "Fast-track thought leadership article", status: "In progress", assignee: "James K." },
                  { action: "Prepare competitive response brief", status: "Queued", assignee: "Sarah M." },
                  { action: "Amplify sustainability content", status: "Scheduled", assignee: "Tom W." },
                  { action: "Accelerate security content series", status: "In progress", assignee: "Lisa R." },
                  { action: "Create culture content package", status: "Planned", assignee: "Maria C." },
                  { action: "Review & refresh onboarding flow", status: "Urgent", assignee: "Alex P." },
                ];
                const a = actions[i];
                return (
                  <div key={signal.id} className="bg-surface-2 rounded-lg p-3 border border-border">
                    <p className="text-sm font-medium mb-1">{a.action}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-1.5 py-0.5 rounded ${
                        a.status === "Urgent" ? "bg-red-500/20 text-red-400" :
                        a.status === "In progress" ? "bg-blue-500/20 text-blue-400" :
                        a.status === "Queued" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-gray-500/20 text-gray-400"
                      }`}>{a.status}</span>
                      <span className="text-text-muted">{a.assignee}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Shift Metrics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-red-400" />
            Reactive Queue ({reactiveItems.length})
          </h3>
          <p className="text-xs text-text-muted mb-4">
            Items requiring immediate editorial response. AI has already drafted angles and assigned resources.
          </p>
          <div className="space-y-3">
            {reactiveItems.map(signal => (
              <div key={signal.id} className="flex items-center gap-3 p-3 bg-surface-2 rounded-lg">
                <Clock size={14} className="text-red-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{signal.title}</p>
                  <p className="text-xs text-text-muted">Detected: {new Date(signal.detectedAt).toLocaleTimeString()}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs border ${urgencyColors[signal.urgency]}`}>
                  {signal.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-success" />
            Proactive Opportunities ({proactiveItems.length})
          </h3>
          <p className="text-xs text-text-muted mb-4">
            Strategic opportunities identified by AI for planned, newsroom-led storytelling.
          </p>
          <div className="space-y-3">
            {proactiveItems.map(signal => (
              <div key={signal.id} className="flex items-center gap-3 p-3 bg-surface-2 rounded-lg">
                <TrendingUp size={14} className="text-success shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{signal.title}</p>
                  <p className="text-xs text-text-muted">{signal.category} · Relevance: {signal.relevance}%</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs border ${urgencyColors[signal.urgency]}`}>
                  {signal.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-surface rounded-xl border border-primary/20 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={18} className="text-primary-light" />
          <h3 className="font-semibold">AI Editorial Summary</h3>
        </div>
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-text-muted mb-1">Reactive/Proactive Ratio</p>
            <p className="text-2xl font-bold text-primary-light">
              {Math.round((reactiveItems.length / trendSignals.length) * 100)}% / {Math.round((proactiveItems.length / trendSignals.length) * 100)}%
            </p>
            <p className="text-xs text-text-muted mt-1">Target: 30% reactive / 70% proactive</p>
          </div>
          <div>
            <p className="text-text-muted mb-1">Avg Response Time</p>
            <p className="text-2xl font-bold text-success">2.4 hrs</p>
            <p className="text-xs text-text-muted mt-1">From signal detection to content action</p>
          </div>
          <div>
            <p className="text-text-muted mb-1">Stories Sourced from Signals</p>
            <p className="text-2xl font-bold text-accent">73%</p>
            <p className="text-xs text-text-muted mt-1">Up from 41% last quarter (pre-AI)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
