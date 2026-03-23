"use client";

import { useState } from "react";
import { Map, Zap, Target, BarChart3, FileText } from "lucide-react";
import { generateContentRoadmap } from "@/lib/ai-engine";

const priorityOptions = [
  { id: "growth", label: "Growth", description: "Drive acquisition and pipeline" },
  { id: "brand", label: "Brand Authority", description: "Build trust and thought leadership" },
  { id: "product", label: "Product-Led", description: "Feature adoption and education" },
  { id: "customer", label: "Customer-First", description: "Retention and satisfaction" },
];

const newsroomColors: Record<string, string> = {
  consumer: "bg-indigo-500/20 text-indigo-400",
  enterprise: "bg-emerald-500/20 text-emerald-400",
  brand: "bg-amber-500/20 text-amber-400",
  product: "bg-red-500/20 text-red-400",
};

export default function RoadmapPage() {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(["growth", "brand"]);
  const roadmap = generateContentRoadmap(selectedPriorities);

  const togglePriority = (id: string) => {
    setSelectedPriorities(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold">AI Content Roadmap Generator</h1>
        <p className="text-text-muted text-sm mt-1">
          Translates business priorities into structured content plans — the core skill of a Content Editorial Manager
        </p>
      </div>

      {/* Priority Selector */}
      <div className="bg-surface rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Target size={18} className="text-primary-light" />
          <h2 className="font-semibold">Business Priorities</h2>
          <span className="text-xs text-text-muted ml-2">Select priorities to generate a content roadmap</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {priorityOptions.map(opt => {
            const active = selectedPriorities.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => togglePriority(opt.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  active
                    ? "bg-primary/10 border-primary/50 ring-1 ring-primary/20"
                    : "bg-surface-2 border-border hover:border-border/80"
                }`}
              >
                <p className="font-medium text-sm">{opt.label}</p>
                <p className="text-xs text-text-muted mt-1">{opt.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Generated Roadmap */}
      {roadmap.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-primary-light" />
            <h2 className="font-semibold">AI-Generated Content Roadmap</h2>
          </div>

          {roadmap.map((item, idx) => (
            <div key={idx} className="bg-surface rounded-xl border border-border overflow-hidden">
              <div className="p-5 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-primary-light font-medium">{item.quarter}</span>
                    <h3 className="text-lg font-bold mt-1">{item.theme}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 size={14} className="text-text-muted" />
                    <span className="text-xs text-text-muted">{item.pieces.length} content pieces</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border">
                {item.pieces.map((piece, i) => (
                  <div key={i} className="p-4 hover:bg-surface-2 transition-colors">
                    <div className="flex items-start gap-3">
                      <FileText size={16} className="text-text-muted mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{piece.title}</p>
                          <span className={`px-2 py-0.5 rounded text-xs ${newsroomColors[piece.newsroom] || "bg-gray-500/20 text-gray-400"}`}>
                            {piece.newsroom}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs bg-surface-3 text-text-muted">
                            {piece.type}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-1">{piece.rationale}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* KPIs */}
              <div className="p-4 bg-surface-2 border-t border-border">
                <p className="text-xs font-medium text-text-muted mb-2">Target KPIs</p>
                <div className="flex gap-3">
                  {item.kpis.map((kpi, i) => (
                    <span key={i} className="px-3 py-1.5 bg-surface rounded-lg text-xs font-medium text-primary-light border border-primary/20">
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border p-12 text-center">
          <Map size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-muted">Select at least one business priority to generate a content roadmap</p>
        </div>
      )}
    </div>
  );
}
