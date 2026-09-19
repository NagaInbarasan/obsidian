---
name: talent-backend
description: Builds and reviews the AI Talent Discovery prototype backend using Node.js, TypeScript, Express, PostgreSQL, Prisma, pgvector, Ollama, and Qwen. Use for database design, APIs, AI pipelines, skill extraction, matching, RAG, career intelligence, security, and backend testing.
---

# Talent Backend Skill

## Mission

Build a deterministic, auditable backend around a local Qwen model.

Core principle:

```text
Database = facts
Algorithms = authoritative calculations
Qwen = extraction + semantic reasoning + explanation
```

## Before coding

1. Inspect repository structure.
2. Read the backend plan.
3. Inspect existing schema/API conventions.
4. Identify ownership conflicts with parallel agents.
5. Do not change shared schema files casually.
6. Preserve existing working behavior.

## AI rules

Qwen output is untrusted input.

Every structured AI response must:
1. be parsed
2. be validated with Zod
3. be normalized
4. be checked for required fields
5. be logged where appropriate
6. only then be persisted

Never blindly persist model output.

## Skill extraction

For every extracted skill, preserve:
- skill name
- normalized skill ID
- source
- evidence
- confidence
- status
- timestamp

Use statuses such as:

```text
explicit
evidence-backed-inferred
potential
self-declared
```

Do not silently upgrade inferred skills to verified skills.

## Matching

Role matching must be reproducible.

Store:
- role ID
- employee ID
- score
- scoring version
- matched skills
- partial skills
- missing skills
- supporting evidence

Qwen may explain the result but must not be the authoritative calculator.

## RAG

Retrieve first, generate second.

```text
query
 ↓
retrieval
 ↓
relevant evidence
 ↓
context assembly
 ↓
Qwen
 ↓
validated response
```

Never give the model unrestricted access to the whole database when only a small context is needed.

## Grounding

The assistant must not invent:
- employee experience
- skills
- certifications
- projects
- roles
- opportunities
- courses

If evidence is unavailable, say so.

## Learning recommendations

Qwen must not invent learning resources.

Retrieve from the learning catalog first, then ask Qwen to personalize the plan.

## Security

Treat employee-provided content as untrusted.

Defend against:
- prompt injection
- malicious document instructions
- SQL injection
- oversized requests
- unauthorized employee access
- unauthorized HR operations
- secret leakage
- model-output injection

Never expose:
- Ollama internals
- database credentials
- server environment variables
- private employee records to unauthorized users

## Testing

Maintain tests for:
- skill normalization
- skill extraction validation
- scoring
- skill-gap calculation
- retrieval
- authorization
- AI output parsing
- prompt-injection cases
- empty data
- malformed model output

Create deterministic fixtures so model changes can be benchmarked.

## Model strategy

Default:

```text
Ollama → Qwen3 8B
```

Optional evaluation:

```text
Ollama → Qwen3.5 9B
```

Do not fine-tune during the first prototype.

Compare models using a fixed evaluation set.

Measure:
- extraction accuracy
- JSON validity
- evidence grounding
- hallucination rate
- latency
- resource usage

## Agent safety

Do not:
- modify frontend files unless assigned
- alter API contracts without documenting the change
- change Prisma schema while another database agent owns it
- bypass validation to make an AI demo work
- hardcode fake employee facts into production paths
- make the LLM the authoritative source for numeric decisions
