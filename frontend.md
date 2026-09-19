# AI Talent Discovery — Frontend Work Plan

## Purpose

Build the complete frontend for the AI-Powered Talent Discovery & Employee Profiling prototype.

The frontend must consume backend APIs and must not implement business truth, scoring logic, or AI reasoning itself.

## Recommended stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- TanStack Query for server state
- Zod for client-side response/form validation
- Recharts for analytics
- Lucide React for icons

Do not introduce another UI framework unless required.

## Ownership

Frontend is owned by the frontend developer.

Backend owns:
- API contracts
- database
- AI pipelines
- role matching
- skill scoring
- embeddings/RAG
- authentication/authorization rules

Frontend consumes those contracts.

## UI architecture

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── employee/
│   ├── skills/
│   ├── roles/
│   ├── matching/
│   ├── career/
│   └── hr/
├── pages/
│   ├── dashboard/
│   ├── employees/
│   ├── employee-profile/
│   ├── roles/
│   ├── opportunities/
│   ├── skill-gaps/
│   ├── career-roadmap/
│   ├── career-assistant/
│   └── hr-intelligence/
├── api/
├── hooks/
├── types/
├── lib/
└── styles/
```

## Prototype pages

### 1. Dashboard

Show:
- total employees
- skills discovered
- available internal opportunities
- emerging skill gaps
- recent AI profile updates

### 2. Employee directory

Features:
- search
- department filter
- role filter
- skill filter
- employee cards/table
- match-to-role action

### 3. Employee profile

Sections:
- Overview
- Current role
- Experience timeline
- Skills
- Discovered/transferable skills
- Projects
- Learning
- Achievements
- Career targets
- Role matches
- Skill gaps
- Profile evolution timeline

Important UI distinction:
- Explicit skill
- Evidence-backed inferred skill
- Potential skill

Never present inferred skills as verified facts.

### 4. Role details

Show:
- role description
- required skills
- preferred skills
- experience requirements
- matched employees
- skill demand

### 5. Role matching

Show:
- match score supplied by backend
- matched skills
- partial matches
- missing skills
- evidence
- explanation from AI

The frontend must display the backend score; it must not invent or recompute the authoritative score.

### 6. Skill gap analysis

Show:
- target role
- current skills
- required skills
- missing skills
- priority
- evidence
- recommended learning

### 7. Career roadmap

Show:
- 30/60/90-day plan
- skills to learn
- courses
- projects
- certifications
- milestones
- progress

### 8. AI Career Assistant

Chat interface:
- employee context
- conversation
- citations/evidence where returned
- suggested questions
- loading state
- error/retry state

Example prompts:
- "Why am I matched to this role?"
- "What skills should I learn next?"
- "Which internal projects fit my profile?"
- "What is my biggest skill gap for AI Engineer?"

### 9. HR intelligence dashboard

Show:
- workforce skill distribution
- skill gaps
- emerging skill demand
- talent availability
- internal mobility opportunities
- department breakdown
- role demand

## Design direction

Use a professional enterprise talent-intelligence interface.

Visual priorities:
- clean
- data-dense but readable
- strong typography
- consistent spacing
- accessible contrast
- restrained use of gradients
- responsive desktop-first layout

Avoid:
- gaming/anime styling
- excessive neon
- chatbot-only appearance
- fake AI magic animations
- decorative charts with no data

## API integration contract

Frontend should expect backend endpoints approximately like:

```text
GET    /api/employees
GET    /api/employees/:id
GET    /api/employees/:id/profile
GET    /api/employees/:id/matches
GET    /api/employees/:id/gaps
GET    /api/roles
GET    /api/roles/:id
GET    /api/roles/:id/matches
GET    /api/opportunities
GET    /api/skills
GET    /api/learning-resources

POST   /api/ai/extract-skills
POST   /api/ai/match-explanation
POST   /api/ai/career-plan
POST   /api/ai/career-assistant
```

Do not assume these are final contracts. Read the backend API specification before integration.

## Parallel-agent workflow

Frontend agents can work in parallel only when their files/components do not overlap.

Suggested agents:

### Agent F1 — App shell
- routing
- layout
- navigation
- global styles
- theme
- loading/error boundaries

### Agent F2 — Employee experience
- employee directory
- employee profile
- skills
- experience
- projects
- learning

### Agent F3 — Matching/career
- role pages
- matching UI
- skill-gap UI
- career roadmap

### Agent F4 — HR analytics
- HR dashboard
- charts
- workforce skill views
- talent availability

### Agent F5 — Career assistant
- chat UI
- conversation state
- citations/evidence UI
- suggested prompts

### Agent F6 — QA/polish
- responsive testing
- accessibility
- visual consistency
- API loading/error/empty states

Do not allow parallel agents to edit the same files simultaneously.

## Definition of done

Frontend is complete when:
- all prototype pages exist
- routing works
- API data is rendered
- loading/empty/error states exist
- mobile/tablet layouts do not break
- no mock data remains on production paths
- match scores come from backend
- AI explanations show their supporting evidence when available
- no business logic is duplicated from backend
- TypeScript has no avoidable errors
- lint/build succeeds
