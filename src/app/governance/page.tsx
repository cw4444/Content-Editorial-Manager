"use client";

import { useState } from "react";
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Users,
  Zap,
  BookOpen,
} from "lucide-react";
import { editorialStandards, contentPieces } from "@/lib/data";
import { generateContentBrief } from "@/lib/ai-engine";

export default function GovernancePage() {
  const [briefTopic, setBriefTopic] = useState("");
  const [briefNewsroom, setBriefNewsroom] = useState("consumer");
  const [briefType, setBriefType] = useState("article");
  const [generatedBrief, setGeneratedBrief] = useState<string | null>(null);

  const handleGenerateBrief = () => {
    if (!briefTopic.trim()) return;
    setGeneratedBrief(generateContentBrief(briefTopic, briefNewsroom, briefType));
  };

  // Compliance check simulation
  const complianceChecks = contentPieces
    .filter(c => c.status !== "archived")
    .map(piece => ({
      ...piece,
      compliance: {
        brandVoice: Math.random() > 0.2,
        seoStandards: Math.random() > 0.3,
        accessibility: Math.random() > 0.15,
        dataCitation: Math.random() > 0.25,
      },
    }));

  const complianceRate = Math.round(
    (complianceChecks.filter(c =>
      Object.values(c.compliance).every(v => v)
    ).length / complianceChecks.length) * 100
  );

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold">Editorial Governance</h1>
        <p className="text-text-muted text-sm mt-1">
          Standards, approval workflows, and AI-enforced editorial quality
        </p>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Compliance Rate</span>
            <Shield size={16} className="text-primary-light" />
          </div>
          <p className={`text-2xl font-bold ${complianceRate >= 80 ? "text-success" : "text-yellow-400"}`}>
            {complianceRate}%
          </p>
          <p className="text-xs text-text-muted mt-1">Across all active content</p>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Standards Active</span>
            <BookOpen size={16} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-success">{editorialStandards.filter(s => s.status === "active").length}</p>
          <p className="text-xs text-text-muted mt-1">Editorial standards enforced</p>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Avg Approval Time</span>
            <Clock size={16} className="text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-yellow-400">1.8d</p>
          <p className="text-xs text-text-muted mt-1">Draft to approved</p>
        </div>
        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Auto-Checks Run</span>
            <Zap size={16} className="text-primary-light" />
          </div>
          <p className="text-2xl font-bold text-primary-light">248</p>
          <p className="text-xs text-text-muted mt-1">This week</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Editorial Standards */}
        <div className="col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">Editorial Standards & Principles</h2>
            </div>
            <div className="divide-y divide-border">
              {editorialStandards.map(standard => (
                <div key={standard.id} className="p-4 hover:bg-surface-2 transition-colors">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-success mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{standard.title}</p>
                        <span className="px-2 py-0.5 rounded text-xs bg-surface-3 text-text-muted">{standard.category}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1">{standard.description}</p>
                      <p className="text-xs text-text-muted mt-1">Last updated: {standard.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Workflow */}
          <div className="bg-surface rounded-xl border border-border p-5">
            <h3 className="font-semibold mb-4">AI-Managed Approval Workflow</h3>
            <div className="flex items-center gap-2">
              {["Draft", "Auto-Check", "Peer Review", "Editorial Review", "Stakeholder", "Publish"].map((step, i) => (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div className={`flex-1 p-3 rounded-lg text-center text-xs font-medium ${
                    i === 1 ? "bg-primary/20 text-primary-light border border-primary/30" : "bg-surface-2 text-text-muted"
                  }`}>
                    {i === 1 && <Zap size={12} className="inline mr-1" />}
                    {step}
                  </div>
                  {i < 5 && <span className="text-text-muted">→</span>}
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3">
              AI runs automated compliance checks at the Auto-Check stage, flagging issues before human review. This reduces reviewer workload by ~40%.
            </p>
          </div>
        </div>

        {/* AI Brief Generator */}
        <div className="space-y-6">
          <div className="bg-surface rounded-xl border border-primary/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={18} className="text-primary-light" />
              <h3 className="font-semibold text-sm">AI Content Brief Generator</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-text-muted block mb-1">Topic</label>
                <input
                  type="text"
                  value={briefTopic}
                  onChange={e => setBriefTopic(e.target.value)}
                  placeholder="e.g., AI in Marketing 2026"
                  className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text placeholder-text-muted focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-text-muted block mb-1">Newsroom</label>
                  <select
                    value={briefNewsroom}
                    onChange={e => setBriefNewsroom(e.target.value)}
                    className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary/50"
                  >
                    <option value="consumer">Consumer</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="brand">Brand</option>
                    <option value="product">Product</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-text-muted block mb-1">Type</label>
                  <select
                    value={briefType}
                    onChange={e => setBriefType(e.target.value)}
                    className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary/50"
                  >
                    <option value="article">Article</option>
                    <option value="blog">Blog Post</option>
                    <option value="video">Video</option>
                    <option value="social">Social</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleGenerateBrief}
                disabled={!briefTopic.trim()}
                className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Brief
              </button>
            </div>
          </div>

          {generatedBrief && (
            <div className="bg-surface rounded-xl border border-border p-5">
              <h3 className="font-semibold text-sm mb-3">Generated Brief</h3>
              <div className="text-xs text-text-muted whitespace-pre-wrap leading-relaxed bg-surface-2 p-4 rounded-lg max-h-96 overflow-y-auto">
                {generatedBrief}
              </div>
            </div>
          )}

          {/* Compliance Alerts */}
          <div className="bg-surface rounded-xl border border-border">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <AlertCircle size={16} className="text-yellow-400" />
              <h3 className="font-semibold text-sm">Compliance Alerts</h3>
            </div>
            <div className="divide-y divide-border">
              {complianceChecks
                .filter(c => !Object.values(c.compliance).every(v => v))
                .slice(0, 4)
                .map(piece => {
                  const issues = Object.entries(piece.compliance)
                    .filter(([, v]) => !v)
                    .map(([k]) => k.replace(/([A-Z])/g, " $1").trim());
                  return (
                    <div key={piece.id} className="p-3">
                      <p className="text-xs font-medium">{piece.title}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {issues.map(issue => (
                          <span key={issue} className="px-1.5 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400">
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
