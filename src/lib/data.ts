// Simulated data for the Content Editorial Manager platform

export type ContentStatus = "draft" | "review" | "approved" | "published" | "archived";
export type Priority = "low" | "medium" | "high" | "urgent";
export type ContentType = "article" | "social" | "email" | "video" | "infographic" | "blog" | "press-release" | "case-study";
export type Newsroom = "consumer" | "enterprise" | "brand" | "product";

export interface ContentPiece {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  priority: Priority;
  newsroom: Newsroom;
  author: string;
  assignee: string;
  dueDate: string;
  publishDate?: string;
  tags: string[];
  brief: string;
  performance?: {
    views: number;
    engagement: number;
    shares: number;
    conversion: number;
  };
}

export interface TrendSignal {
  id: string;
  title: string;
  source: string;
  relevance: number;
  sentiment: "positive" | "negative" | "neutral";
  category: string;
  detectedAt: string;
  suggestedAngle: string;
  urgency: Priority;
}

export interface EditorialStandard {
  id: string;
  title: string;
  category: string;
  description: string;
  status: "active" | "draft" | "deprecated";
  lastUpdated: string;
}

export const newsrooms: Record<Newsroom, { name: string; color: string; description: string; contentCount: number; teamSize: number }> = {
  consumer: { name: "Consumer", color: "#6366f1", description: "B2C products, lifestyle, and consumer engagement", contentCount: 47, teamSize: 6 },
  enterprise: { name: "Enterprise", color: "#10b981", description: "B2B solutions, thought leadership, and industry insights", contentCount: 32, teamSize: 4 },
  brand: { name: "Brand", color: "#f59e0b", description: "Brand storytelling, culture, and corporate comms", contentCount: 28, teamSize: 5 },
  product: { name: "Product", color: "#ef4444", description: "Product launches, features, and technical content", contentCount: 38, teamSize: 5 },
};

export const contentPieces: ContentPiece[] = [
  { id: "c1", title: "Spring Campaign: Refresh Your Routine", type: "article", status: "published", priority: "high", newsroom: "consumer", author: "AI Editorial", assignee: "Sarah M.", dueDate: "2026-03-20", publishDate: "2026-03-21", tags: ["seasonal", "campaign", "lifestyle"], brief: "Seasonal campaign piece targeting consumer renewal themes. Tie into wellness and productivity trends.", performance: { views: 12400, engagement: 8.2, shares: 340, conversion: 3.1 } },
  { id: "c2", title: "Enterprise Security Trends 2026", type: "blog", status: "review", priority: "high", newsroom: "enterprise", author: "AI Editorial", assignee: "James K.", dueDate: "2026-03-25", tags: ["security", "trends", "thought-leadership"], brief: "Deep dive into emerging security trends for enterprise buyers. Position us as thought leaders." },
  { id: "c3", title: "Customer Success: How Acme Scaled 10x", type: "case-study", status: "approved", priority: "medium", newsroom: "enterprise", author: "AI Editorial", assignee: "Lisa R.", dueDate: "2026-03-28", tags: ["customer-story", "growth", "enterprise"], brief: "Showcase Acme Corp's growth story using our platform. Focus on measurable outcomes." },
  { id: "c4", title: "Brand Values: Our Sustainability Commitment", type: "article", status: "draft", priority: "medium", newsroom: "brand", author: "AI Editorial", assignee: "Tom W.", dueDate: "2026-04-01", tags: ["sustainability", "brand", "values"], brief: "Articulate our sustainability roadmap and recent milestones. Authentic, not performative." },
  { id: "c5", title: "Product Update: v4.0 Feature Roundup", type: "blog", status: "draft", priority: "urgent", newsroom: "product", author: "AI Editorial", assignee: "Dev Team", dueDate: "2026-03-24", tags: ["product", "launch", "features"], brief: "Comprehensive feature overview for v4.0 launch. Technical but accessible." },
  { id: "c6", title: "Social Series: Behind the Scenes", type: "social", status: "approved", priority: "low", newsroom: "brand", author: "AI Editorial", assignee: "Maria C.", dueDate: "2026-03-26", tags: ["social", "culture", "engagement"], brief: "5-part social series showing team culture and day-to-day. Humanize the brand." },
  { id: "c7", title: "Email Nurture: Onboarding Flow Refresh", type: "email", status: "review", priority: "high", newsroom: "product", author: "AI Editorial", assignee: "Alex P.", dueDate: "2026-03-27", tags: ["email", "onboarding", "nurture"], brief: "Redesign 7-email onboarding sequence. Focus on time-to-value and reducing churn." },
  { id: "c8", title: "Video: Customer Testimonial Compilation", type: "video", status: "draft", priority: "medium", newsroom: "consumer", author: "AI Editorial", assignee: "Video Team", dueDate: "2026-04-05", tags: ["video", "testimonial", "social-proof"], brief: "Compile best customer testimonials into 90-second highlight reel for paid media." },
  { id: "c9", title: "Infographic: Market Share Analysis", type: "infographic", status: "published", priority: "medium", newsroom: "enterprise", author: "AI Editorial", assignee: "Design Team", dueDate: "2026-03-18", publishDate: "2026-03-19", tags: ["data", "market", "visual"], brief: "Visual breakdown of our market position vs competitors. Use latest analyst data.", performance: { views: 8900, engagement: 12.1, shares: 890, conversion: 1.8 } },
  { id: "c10", title: "Press Release: Partnership Announcement", type: "press-release", status: "review", priority: "urgent", newsroom: "brand", author: "AI Editorial", assignee: "PR Team", dueDate: "2026-03-24", tags: ["PR", "partnership", "announcement"], brief: "Joint announcement with TechPartner Inc. Embargoed until March 25th." },
  { id: "c11", title: "How-To Guide: Getting Started", type: "article", status: "published", priority: "high", newsroom: "product", author: "AI Editorial", assignee: "Content Team", dueDate: "2026-03-15", publishDate: "2026-03-16", tags: ["guide", "onboarding", "education"], brief: "Step-by-step getting started guide for new users. Include screenshots and video.", performance: { views: 22100, engagement: 15.3, shares: 1200, conversion: 8.4 } },
  { id: "c12", title: "Thought Leadership: Future of AI in Marketing", type: "blog", status: "draft", priority: "high", newsroom: "enterprise", author: "AI Editorial", assignee: "James K.", dueDate: "2026-04-02", tags: ["AI", "thought-leadership", "trends"], brief: "Position our CEO's perspective on AI in marketing. Back with data, keep it visionary." },
];

export const trendSignals: TrendSignal[] = [
  { id: "t1", title: "AI Regulation Bill Gaining Momentum", source: "Industry News", relevance: 92, sentiment: "neutral", category: "Regulation", detectedAt: "2026-03-23T08:30:00Z", suggestedAngle: "Position our proactive compliance approach. Publish thought leadership on responsible AI before competitors react.", urgency: "urgent" },
  { id: "t2", title: "Competitor X Launches Free Tier", source: "Competitor Watch", relevance: 88, sentiment: "negative", category: "Competitive", detectedAt: "2026-03-23T06:15:00Z", suggestedAngle: "Counter with value narrative. Highlight premium features and customer success stories that justify investment.", urgency: "high" },
  { id: "t3", title: "#SustainableTech Trending on Social", source: "Social Listening", relevance: 76, sentiment: "positive", category: "Culture", detectedAt: "2026-03-23T10:00:00Z", suggestedAngle: "Amplify our sustainability story. Fast-track the brand values piece and tie into social conversation.", urgency: "medium" },
  { id: "t4", title: "Enterprise Buyers Prioritizing Security Post-Breach", source: "Market Research", relevance: 85, sentiment: "neutral", category: "Market", detectedAt: "2026-03-22T14:00:00Z", suggestedAngle: "Accelerate enterprise security content. Customer proof points showing our security-first approach.", urgency: "high" },
  { id: "t5", title: "Remote Work Anniversary Creates Content Opportunity", source: "Cultural Calendar", relevance: 65, sentiment: "positive", category: "Culture", detectedAt: "2026-03-23T07:00:00Z", suggestedAngle: "Team culture content showing how our distributed team thrives. Tie into employer brand.", urgency: "low" },
  { id: "t6", title: "Customer Sentiment Dip in Onboarding NPS", source: "Customer Insight", relevance: 91, sentiment: "negative", category: "Customer", detectedAt: "2026-03-23T09:00:00Z", suggestedAngle: "Urgent: review and refresh onboarding content. Prioritize how-to guides and email nurture flow.", urgency: "urgent" },
];

export const editorialStandards: EditorialStandard[] = [
  { id: "es1", title: "Brand Voice Guidelines", category: "Tone & Voice", description: "All content must align with our brand voice: confident but not arrogant, technical but accessible, human and warm. Avoid jargon unless writing for technical audiences.", status: "active", lastUpdated: "2026-03-01" },
  { id: "es2", title: "Content Approval Workflow", category: "Process", description: "All content follows: Draft → Peer Review → Editorial Review → Stakeholder Approval → Publish. Urgent items may skip peer review with Editorial Lead sign-off.", status: "active", lastUpdated: "2026-03-10" },
  { id: "es3", title: "SEO Standards", category: "Technical", description: "All web content must include: target keyword in H1, meta description under 160 chars, alt text for images, internal linking (min 2), and structured data where applicable.", status: "active", lastUpdated: "2026-02-15" },
  { id: "es4", title: "Accessibility Requirements", category: "Compliance", description: "All content must meet WCAG 2.1 AA standards. This includes readable fonts, sufficient contrast ratios, descriptive alt text, and captioned video content.", status: "active", lastUpdated: "2026-01-20" },
  { id: "es5", title: "Data Citation Policy", category: "Editorial", description: "All statistics and data points must cite primary sources. No data older than 18 months unless providing historical context. Internal data requires sign-off from Analytics.", status: "active", lastUpdated: "2026-03-05" },
  { id: "es6", title: "Crisis Communication Protocol", category: "Process", description: "In crisis situations: pause all scheduled content, activate the crisis comms template, route all external comms through PR and Legal, and switch to real-time editorial cadence.", status: "active", lastUpdated: "2026-02-28" },
];

export const weeklyCalendar = [
  { day: "Mon", date: "Mar 23", items: [
    { title: "Editorial standup", time: "9:00", type: "meeting" as const },
    { title: "Review: Enterprise Security Trends", time: "10:30", type: "review" as const },
    { title: "Publish: Product Update v4.0", time: "14:00", type: "publish" as const },
  ]},
  { day: "Tue", date: "Mar 24", items: [
    { title: "Content planning: April themes", time: "9:30", type: "planning" as const },
    { title: "Press Release: Partnership (embargoed)", time: "11:00", type: "review" as const },
  ]},
  { day: "Wed", date: "Mar 25", items: [
    { title: "Partnership announcement goes live", time: "8:00", type: "publish" as const },
    { title: "Newsroom sync: Consumer + Brand", time: "13:00", type: "meeting" as const },
    { title: "Spring Campaign performance review", time: "15:00", type: "review" as const },
  ]},
  { day: "Thu", date: "Mar 26", items: [
    { title: "Social series: BTS launch", time: "10:00", type: "publish" as const },
    { title: "Email nurture flow review", time: "14:00", type: "review" as const },
  ]},
  { day: "Fri", date: "Mar 27", items: [
    { title: "Weekly content retrospective", time: "10:00", type: "meeting" as const },
    { title: "Next week planning & prioritization", time: "14:00", type: "planning" as const },
  ]},
];

export const performanceData = {
  weeklyViews: [
    { week: "W8", consumer: 18200, enterprise: 9800, brand: 7600, product: 14300 },
    { week: "W9", consumer: 21500, enterprise: 11200, brand: 8900, product: 16100 },
    { week: "W10", consumer: 19800, enterprise: 13400, brand: 12300, product: 15800 },
    { week: "W11", consumer: 24100, enterprise: 12100, brand: 9200, product: 18900 },
    { week: "W12", consumer: 26300, enterprise: 14800, brand: 11500, product: 22100 },
  ],
  topContent: [
    { title: "How-To Guide: Getting Started", views: 22100, engagement: 15.3, trend: "up" as const },
    { title: "Spring Campaign: Refresh Your Routine", views: 12400, engagement: 8.2, trend: "up" as const },
    { title: "Infographic: Market Share Analysis", views: 8900, engagement: 12.1, trend: "stable" as const },
    { title: "Enterprise Security Best Practices", views: 7200, engagement: 9.8, trend: "down" as const },
    { title: "Product Comparison Guide", views: 6800, engagement: 11.4, trend: "up" as const },
  ],
  channelBreakdown: [
    { channel: "Organic Search", percentage: 38 },
    { channel: "Social Media", percentage: 24 },
    { channel: "Email", percentage: 18 },
    { channel: "Direct", percentage: 12 },
    { channel: "Paid", percentage: 8 },
  ],
};
