# Editorial AI — Content Editorial Manager

An AI-powered platform that handles the core responsibilities of a Content Editorial Manager: running multiple newsrooms, building content roadmaps, making editorial decisions, and turning market signals into stories.

Built in a single session with Claude to explore how AI can augment content operations roles.

## What It Does

**Editorial Command Center**
Real-time dashboard across 4 newsrooms (Consumer, Enterprise, Brand, Product) with AI-generated editorial decisions, content pipeline tracking, and weekly calendar management.

**Reactive → Proactive Story Pipeline**
AI detects market signals — competitor moves, trending topics, customer sentiment shifts, cultural moments — assesses relevance, suggests editorial angles, and routes content actions to the right teams. Designed to shift content operations from reactive production to proactive, newsroom-led storytelling.

**Content Roadmap Generator**
Select business priorities (Growth, Brand Authority, Product-Led, Customer-First) and the AI generates a structured content plan with specific pieces, newsroom assignments, strategic rationale, and target KPIs.

**Performance Analytics**
Content performance dashboards with audience insights that feed back into planning. AI identifies patterns (e.g. which formats outperform, where engagement is declining) and recommends optimisation actions.

**Editorial Governance**
Standards enforcement, AI-managed approval workflows, automated compliance checks, and an on-demand content brief generator that produces full briefs with audience targeting, SEO requirements, and editorial checklists.

## The Idea

A Content Editorial Manager role typically involves strategic planning, cross-team coordination, editorial judgement, and translating business priorities into content plans. This project explores how much of that operational work AI can handle today — not to replace the role entirely, but to show how one person with the right tools could operate at the level of a full editorial team.

The human still brings business context, creative vision, stakeholder relationships, and the judgement to know when the data is wrong. The AI handles the volume: triaging signals, monitoring pipelines, generating roadmaps, enforcing standards, and surfacing the decisions that need a human eye.

## Running It

```bash
git clone https://github.com/cw4444/Content-Editorial-Manager.git
cd Content-Editorial-Manager
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS 4
- Recharts
- Lucide Icons

## Built With

Designed and built entirely by [Claude](https://claude.ai) (Opus 4.6) in a single conversation.
