# AI Talent Discovery — Backend Work Plan

## Purpose

Build the backend intelligence platform for the AI-Powered Talent Discovery & Employee Profiling prototype.

Backend is the source of truth for:
- employee data
- skills
- evidence
- role requirements
- matching
- skill gaps
- learning recommendations
- AI orchestration
- embeddings/RAG
- auditability

## Recommended stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma
- pgvector
- Ollama
- Qwen3 8B initially
- Qwen3.5 9B as an evaluation/upgrade path
- Zod
- Vitest or Jest

Do not fine-tune the model for the first prototype.

## Core architecture

```text
API
 ↓
Application services
 ↓
Domain logic
 ├── Skill extraction
 ├── Skill evidence
 ├── Role matching
 ├── Gap analysis
 ├── Learning recommendation
 └── Career assistant
 ↓
PostgreSQL + pgvector
 ↓
Ollama / Qwen
```

Important rule:

```text
Database = facts
Matching engine = deterministic scoring
Qwen = extraction, semantic reasoning, explanation
```

Never let Qwen be the authoritative source for a numeric employee/role score.

## Database entities

Start with:

```text
Employee
EmployeeExperience
Project
LearningActivity
Achievement

Skill
SkillCategory
EmployeeSkill
SkillEvidence

Role
RoleSkill

Opportunity
OpportunitySkill

LearningResource

EmployeeCareerGoal
SkillGap
RoleMatch

EmbeddingDocument
Feedback
AIInteraction
```

## Employee skill representation

Every skill should retain evidence.

Example:

```json
{
  "skill": "Python",
  "level": 4,
  "confidence": 0.91,
  "evidence": [
    {
      "type": "project",
      "sourceId": "project_123",
      "text": "Developed REST APIs using Python"
    }
  ],
  "status": "explicit"
}
```

Recommended statuses:

```text
explicit
evidence-backed-inferred
potential
self-declared
```

Do not silently convert inferred skills into verified skills.

## Skill extraction pipeline

Input:
- resume/profile
- experience
- projects
- learning
- achievements

Pipeline:

```text
raw text
 ↓
Qwen structured extraction
 ↓
validate JSON with Zod
 ↓
normalize skill names
 ↓
map to Skill ontology
 ↓
store evidence
 ↓
update EmployeeSkill
```

Qwen must return structured JSON.

The backend validates it before writing to the database.

## Hidden/transferable skill discovery

Use Qwen to identify skills not explicitly named but supported by evidence.

Example:

```text
"Coordinated designers, developers and weekly deadlines"
```

Possible inference:

```text
Project coordination
Stakeholder management
Planning
Leadership
```

Store these as inferred/potential skills with evidence and confidence.

Never present an inference as an objective fact.

## Skill scoring

Create a deterministic scoring service.

Inputs:
- employee skills
- evidence strength
- role requirements
- skill weights
- experience requirements

Example:

```text
role score =
Σ(normalized employee skill score × role skill weight)
+ experience component
```

Keep the formula in code and version it.

Store:
- score
- matched skills
- partial skills
- missing skills
- evidence
- scoring version

## Semantic matching

Use embeddings for:
- projects
- role descriptions
- skills
- employee experience
- learning resources

Store vectors in pgvector.

Use semantic retrieval to find:
- related roles
- related projects
- transferable skills
- relevant learning resources

Semantic similarity is supporting evidence, not the only source of truth.

## Role matching pipeline

```text
Employee
 ↓
Load verified/inferred skills
 ↓
Load role requirements
 ↓
Deterministic skill matching
 ↓
Optional semantic retrieval
 ↓
Calculate score
 ↓
Retrieve evidence
 ↓
Qwen generates explanation
 ↓
Return structured result
```

## Skill gap pipeline

```text
Target role
 ↓
Required skills
 ↓
Employee skill profile
 ↓
Set difference + proficiency comparison
 ↓
Prioritize gaps
 ↓
Retrieve learning resources
 ↓
Qwen creates personalized roadmap
```

## Learning recommendation rules

Do not let Qwen invent courses.

Learning resources must come from the database or an explicitly configured external source.

Pipeline:

```text
skill gap
 ↓
query learning catalog
 ↓
rank relevant resources
 ↓
Qwen personalizes ordering/explanation
```

## Career assistant

Use RAG.

Retrieve:
- employee profile
- skill evidence
- role requirements
- opportunities
- learning resources
- career goals

Then send only the relevant context to Qwen.

The assistant should answer:
- why a role matches
- what skills are missing
- what to learn next
- which projects fit
- how the profile has evolved

Do not allow the assistant to invent employee facts.

## AI model strategy

### Default

Qwen3 8B through Ollama.

Use it for:
- structured extraction
- skill inference
- explanations
- career plans
- assistant responses

### Upgrade/evaluation

Qwen3.5 9B.

Run the same benchmark set against both models.

Measure:
- JSON validity
- skill extraction precision
- evidence grounding
- hallucination rate
- latency
- memory usage
- response quality

Use the better model per workload rather than automatically replacing everything.

## Antigravity 2.0 agent strategy

Use Gemini models for coding/orchestration, not as the application's employee-intelligence model.

Suggested model allocation:

### Gemini Flash
Use heavily for:
- boilerplate
- CRUD
- tests
- migrations
- repetitive refactors
- API wiring
- documentation
- small bug fixes

### Gemini Pro
Use for:
- architecture
- difficult backend logic
- RAG design
- schema review
- security review
- complex debugging

### Claude Sonnet
Reserve for:
- difficult cross-file refactors
- tricky reasoning
- code review
- architecture validation

### Claude Opus
Use sparingly for:
- major architecture review
- difficult security/design decisions
- final quality audit
- problems where Sonnet/Gemini repeatedly fail

Do not spend Opus on CRUD.

Antigravity 2.0 supports parallel agents and dynamic subagents, so independent backend tasks should be run concurrently when safe.

## Backend parallel-agent workflow

### Agent B1 — Database
- Prisma schema
- migrations
- seed data
- indexes
- pgvector setup

### Agent B2 — Core API
- Express structure
- validation
- employee/role/project endpoints
- API error handling

### Agent B3 — AI extraction
- Ollama integration
- Qwen prompts
- structured output
- skill normalization
- evidence storage

### Agent B4 — Matching
- deterministic role matching
- skill scoring
- semantic retrieval
- explanation preparation

### Agent B5 — Career intelligence
- gap analysis
- learning recommendation
- roadmap generation

### Agent B6 — RAG assistant
- embeddings
- retrieval
- context assembly
- career assistant endpoint
- grounding rules

### Agent B7 — Security/QA
- authorization
- input validation
- prompt-injection defenses
- rate limits
- tests
- logging
- hallucination/grounding tests

### Agent B8 — Integration
- API contract verification
- frontend integration support
- end-to-end testing
- performance checks

Do not let multiple agents modify the Prisma schema simultaneously.

## API contract

Initial endpoints:

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

Document final request/response schemas in the repository.

## Security

Prototype must still include:
- environment variables for secrets
- no model/API secrets in frontend
- Zod validation
- parameterized/database-safe queries through Prisma
- authorization checks
- request size limits
- rate limiting on AI endpoints
- audit logging for AI-generated profile changes
- prompt injection defenses for employee-provided documents
- clear distinction between user-provided and system-generated information

## Definition of done

Backend is complete when:
- database schema works
- seed dataset exists
- employee profiles can be generated
- skills are extracted into validated structured data
- evidence is stored
- role matching is deterministic and reproducible
- skill gaps work
- learning recommendations use real catalog data
- RAG assistant is grounded
- AI output is validated
- tests cover critical services
- API documentation exists
- frontend can consume stable contracts
