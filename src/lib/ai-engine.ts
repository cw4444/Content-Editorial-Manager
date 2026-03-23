// AI Editorial Engine - the "brain" that replaces the Content Editorial Manager
// This demonstrates AI can make the same decisions a human manager would

import { ContentPiece, TrendSignal, contentPieces, trendSignals, performanceData } from "./data";

export interface EditorialDecision {
  action: string;
  rationale: string;
  priority: "low" | "medium" | "high" | "urgent";
  impact: string;
  linkedContent?: string[];
}

export interface ContentRoadmapItem {
  quarter: string;
  theme: string;
  pieces: { title: string; type: string; newsroom: string; rationale: string }[];
  kpis: string[];
}

// AI Decision Engine: Analyzes signals and makes editorial calls
export function generateEditorialDecisions(): EditorialDecision[] {
  const decisions: EditorialDecision[] = [];

  // Analyze trend signals against current content pipeline
  for (const signal of trendSignals) {
    if (signal.urgency === "urgent" || signal.relevance > 85) {
      const relatedContent = contentPieces.filter(c =>
        c.tags.some(t => signal.category.toLowerCase().includes(t) || t.includes(signal.category.toLowerCase()))
      );

      decisions.push({
        action: `Respond to: ${signal.title}`,
        rationale: signal.suggestedAngle,
        priority: signal.urgency,
        impact: `Relevance score: ${signal.relevance}/100. ${signal.sentiment === "negative" ? "Defensive positioning needed." : "Opportunity to lead conversation."}`,
        linkedContent: relatedContent.map(c => c.id),
      });
    }
  }

  // Analyze content pipeline health
  const overdueContent = contentPieces.filter(c => {
    const due = new Date(c.dueDate);
    const now = new Date("2026-03-23");
    return due < now && c.status !== "published" && c.status !== "archived";
  });

  if (overdueContent.length > 0) {
    decisions.push({
      action: `Address ${overdueContent.length} overdue content pieces`,
      rationale: "Content pipeline has items past their due date. Recommend triaging: either fast-track to publish, adjust timelines, or deprioritize based on current business needs.",
      priority: "high",
      impact: "Pipeline health at risk. Overdue items create bottlenecks and signal capacity issues.",
      linkedContent: overdueContent.map(c => c.id),
    });
  }

  // Performance-driven decisions
  const topPerformer = performanceData.topContent[0];
  decisions.push({
    action: `Double down on "${topPerformer.title}" format`,
    rationale: `This piece is our top performer with ${topPerformer.views.toLocaleString()} views and ${topPerformer.engagement}% engagement. Create more content in this format and topic cluster to capitalize on proven demand.`,
    priority: "high",
    impact: "Data-driven content multiplication. High confidence in ROI based on historical performance.",
  });

  // Cross-newsroom coordination
  decisions.push({
    action: "Coordinate cross-newsroom narrative for Q2",
    rationale: "Consumer and Enterprise newsrooms have overlapping themes around security and trust. Align messaging to create a unified narrative that serves both audiences while maintaining distinct tone.",
    priority: "medium",
    impact: "Brand consistency + content efficiency. Shared research and assets reduce production costs.",
  });

  // Capacity planning
  const draftCount = contentPieces.filter(c => c.status === "draft").length;
  const reviewCount = contentPieces.filter(c => c.status === "review").length;
  if (reviewCount > draftCount) {
    decisions.push({
      action: "Review bottleneck detected - redistribute reviewer capacity",
      rationale: `${reviewCount} pieces in review vs ${draftCount} in draft. The pipeline is bottlenecked at review stage. Recommend: assign additional reviewers or implement tiered review (editorial-only for low-risk content).`,
      priority: "medium",
      impact: "Faster time-to-publish. Reduced reviewer fatigue. Better content velocity.",
    });
  }

  return decisions;
}

// AI Content Roadmap Generator
export function generateContentRoadmap(businessPriorities: string[]): ContentRoadmapItem[] {
  const priorityMap: Record<string, ContentRoadmapItem> = {
    growth: {
      quarter: "Q2 2026",
      theme: "Accelerate Growth",
      pieces: [
        { title: "Customer Growth Playbook Series (4-part)", type: "blog", newsroom: "enterprise", rationale: "Position as growth partner. SEO targeting 'enterprise growth strategy' cluster." },
        { title: "ROI Calculator Interactive Tool", type: "infographic", newsroom: "product", rationale: "Bottom-funnel conversion asset. Supports sales enablement." },
        { title: "Success Story Video Series", type: "video", newsroom: "consumer", rationale: "Social proof at scale. Repurposable across paid, organic, and email." },
        { title: "Growth Benchmarks Report", type: "article", newsroom: "enterprise", rationale: "Lead gen magnet. Establishes thought leadership with original data." },
      ],
      kpis: ["MQL increase +15%", "Organic traffic +20%", "Content-attributed pipeline +$500K"],
    },
    brand: {
      quarter: "Q2 2026",
      theme: "Brand Authority & Trust",
      pieces: [
        { title: "CEO Thought Leadership Series", type: "blog", newsroom: "brand", rationale: "Executive visibility program. LinkedIn + owned channels." },
        { title: "Annual Impact Report", type: "article", newsroom: "brand", rationale: "Sustainability + social impact narrative. PR opportunity." },
        { title: "Industry Podcast Launch", type: "video", newsroom: "enterprise", rationale: "New channel. Builds community and positions us as industry convener." },
        { title: "Employee Advocacy Content Kit", type: "social", newsroom: "brand", rationale: "Amplify reach through employee networks. 10x organic reach potential." },
      ],
      kpis: ["Share of voice +10%", "Brand sentiment score +5pts", "Press mentions +25%"],
    },
    product: {
      quarter: "Q2 2026",
      theme: "Product-Led Growth Content",
      pieces: [
        { title: "Feature Deep-Dive Series", type: "blog", newsroom: "product", rationale: "Reduce support tickets by 20%. Educate users on underused features." },
        { title: "Migration Guide: Competitor Switch", type: "article", newsroom: "product", rationale: "Capture competitor dissatisfaction. SEO + sales enablement." },
        { title: "Community Tutorials Program", type: "video", newsroom: "product", rationale: "User-generated content flywheel. Build community engagement." },
        { title: "Monthly Product Newsletter", type: "email", newsroom: "product", rationale: "Retention play. Keep users informed and engaged with new capabilities." },
      ],
      kpis: ["Feature adoption +25%", "Support tickets -20%", "NPS +8pts"],
    },
    customer: {
      quarter: "Q2 2026",
      theme: "Customer-First Content",
      pieces: [
        { title: "Customer Journey Content Mapping", type: "article", newsroom: "consumer", rationale: "Align content to every stage of customer journey. Fill gaps identified in funnel analysis." },
        { title: "Personalized Onboarding Paths", type: "email", newsroom: "product", rationale: "Segment-specific onboarding. Reduce time-to-value by 40%." },
        { title: "Customer Community Hub", type: "blog", newsroom: "consumer", rationale: "Peer-to-peer content sharing. Reduces CAC through organic advocacy." },
        { title: "Feedback-Driven Content Series", type: "social", newsroom: "consumer", rationale: "Show customers we listen. Turn NPS feedback into content topics." },
      ],
      kpis: ["Customer satisfaction +12%", "Churn rate -15%", "Referral rate +20%"],
    },
  };

  const defaultPriorities = ["growth", "brand", "product", "customer"];
  const activePriorities = businessPriorities.length > 0 ? businessPriorities : defaultPriorities;

  return activePriorities
    .filter(p => priorityMap[p])
    .map(p => priorityMap[p]);
}

// AI Newsroom Health Scorer
export function calculateNewsroomHealth(newsroom: string): {
  score: number;
  factors: { name: string; score: number; insight: string }[];
  recommendation: string;
} {
  const nrContent = contentPieces.filter(c => c.newsroom === newsroom);
  const published = nrContent.filter(c => c.status === "published");
  const overdue = nrContent.filter(c => new Date(c.dueDate) < new Date("2026-03-23") && c.status !== "published");

  const pipelineHealth = Math.max(0, 100 - (overdue.length * 20));
  const contentVelocity = Math.min(100, (published.length / Math.max(nrContent.length, 1)) * 100 * 2);
  const avgEngagement = published.reduce((sum, c) => sum + (c.performance?.engagement || 0), 0) / Math.max(published.length, 1);
  const engagementScore = Math.min(100, avgEngagement * 8);

  const factors = [
    { name: "Pipeline Health", score: Math.round(pipelineHealth), insight: overdue.length > 0 ? `${overdue.length} overdue items need attention` : "All content on track" },
    { name: "Content Velocity", score: Math.round(contentVelocity), insight: `${published.length}/${nrContent.length} pieces published this period` },
    { name: "Engagement Quality", score: Math.round(engagementScore), insight: `Avg engagement: ${avgEngagement.toFixed(1)}%` },
  ];

  const score = Math.round(factors.reduce((sum, f) => sum + f.score, 0) / factors.length);

  let recommendation = "";
  if (score >= 80) recommendation = "Strong performance. Focus on scaling what works and experimenting with new formats.";
  else if (score >= 60) recommendation = "Good foundation but room for improvement. Address pipeline bottlenecks and double down on high-performing content.";
  else recommendation = "Needs attention. Prioritize clearing the backlog, reassess content strategy alignment, and review team capacity.";

  return { score, factors, recommendation };
}

// AI Editorial Calendar Optimizer
export function getCalendarRecommendations(): string[] {
  return [
    "Move the Partnership Press Release to Tuesday AM for maximum news cycle coverage",
    "The Product v4.0 post should go live Monday — competitor launched Friday, we need to control the narrative",
    "Schedule the Social BTS series for Thursday 10am — our analytics show highest engagement mid-week",
    "Block Friday PM for Q2 planning — the team needs uninterrupted strategy time",
    "Consider pausing lower-priority brand content this week to focus on urgent competitive response",
    "The email nurture review should happen before the onboarding NPS issue escalates further",
  ];
}

// AI Content Brief Generator
export function generateContentBrief(topic: string, newsroom: string, type: string): string {
  return `## Content Brief: ${topic}

**Newsroom:** ${newsroom.charAt(0).toUpperCase() + newsroom.slice(1)}
**Format:** ${type.charAt(0).toUpperCase() + type.slice(1)}
**Generated:** ${new Date().toLocaleDateString()}

### Objective
Create compelling ${type} content that addresses "${topic}" for our ${newsroom} audience, aligned with current business priorities and market conditions.

### Target Audience
${newsroom === "enterprise" ? "Decision-makers and senior leaders at mid-to-large organizations. They value data-driven insights, ROI clarity, and peer validation." :
  newsroom === "consumer" ? "End users and individual buyers. They respond to practical value, emotional connection, and social proof." :
  newsroom === "product" ? "Current users and technical evaluators. They need clear, actionable information with practical examples." :
  "Internal and external stakeholders who care about our mission, values, and cultural narrative."}

### Key Messages
1. Lead with insight, not product — earn attention before asking for action
2. Support claims with data or customer evidence
3. Connect to the broader narrative of our Q2 theme

### SEO & Distribution
- Target 2-3 primary keywords with search volume validation
- Plan for at least 3 distribution channels (owned, earned, paid)
- Create 5+ social derivatives for cross-platform amplification

### Success Metrics
- Primary: Engagement rate above ${newsroom === "enterprise" ? "8%" : "10%"}
- Secondary: Social shares, time on page, conversion to next action
- Tertiary: Brand lift contribution (measured quarterly)

### Editorial Standards Checklist
- [ ] Aligns with brand voice guidelines
- [ ] Sources cited and verified
- [ ] Accessibility standards met
- [ ] Legal/compliance review (if applicable)
- [ ] Cross-linked to related content`;
}
