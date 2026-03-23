"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Map,
  BarChart3,
  Shield,
  Zap,
  Bot,
} from "lucide-react";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/newsrooms", label: "Newsrooms", icon: Newspaper },
  { href: "/pipeline", label: "Story Pipeline", icon: Zap },
  { href: "/roadmap", label: "Content Roadmap", icon: Map },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/governance", label: "Governance", icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm">Editorial AI</h1>
            <p className="text-xs text-text-muted">Content Manager</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-success">
          <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
          AI Engine Active
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-primary/20 text-primary-light font-medium"
                  : "text-text-muted hover:bg-surface-2 hover:text-text"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="bg-surface-2 rounded-lg p-3 text-xs">
          <p className="text-text-muted mb-1">AI Decisions Today</p>
          <p className="text-2xl font-bold text-primary-light">14</p>
          <p className="text-text-muted mt-1">6 urgent, 8 strategic</p>
        </div>
      </div>
    </aside>
  );
}
