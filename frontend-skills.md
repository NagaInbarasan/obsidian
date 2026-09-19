---
name: talent-frontend
description: Builds and reviews the AI Talent Discovery prototype frontend using React, Vite, TypeScript, Tailwind CSS, and the project's API contracts. Use for frontend pages, components, routing, UI state, accessibility, charts, and frontend integration work.
---

# Talent Frontend Skill

## Mission

Build a professional enterprise talent-intelligence frontend.

The frontend is a presentation and interaction layer. It is not the source of truth for:
- employee facts
- AI reasoning
- role-match scores
- skill-gap calculations
- recommendation ranking

## Before coding

1. Inspect the existing project structure.
2. Read the frontend plan.
3. Read the backend API contract.
4. Reuse existing components before creating duplicates.
5. Identify files that another agent may be editing.
6. Make the smallest coherent change.

## Coding rules

- TypeScript first.
- Avoid `any`.
- Keep components focused.
- Prefer reusable components.
- Keep server state in TanStack Query or the project's chosen server-state layer.
- Keep API calls in the API/service layer, not scattered through UI components.
- Validate external API responses where appropriate.
- Use semantic HTML.
- Build keyboard-accessible interactions.
- Always implement loading, empty, error and success states.
- Never hardcode authoritative business values.
- Never calculate the official role-match score in the UI.

## AI-result presentation

Always distinguish:

```text
Verified / explicit
Evidence-backed inferred
Potential
Self-declared
```

Show evidence when available.

Never write copy that turns an AI inference into a confirmed employee capability.

## Charts

Charts must answer a question.

Prefer:
- skill distribution
- skill-gap counts
- role demand
- talent availability
- profile evolution

Avoid decorative charts.

## API integration

Do not guess API fields.

If the backend contract changes:
1. update types
2. update API layer
3. update affected components
4. test empty/loading/error states

## Visual QA

Before finishing:
- desktop
- tablet
- narrow viewport
- keyboard navigation
- long names
- missing data
- slow API
- API error
- zero-result searches

## Agent safety

Do not:
- overwrite unrelated components
- modify backend code unless explicitly assigned
- modify Prisma/database files
- change API semantics to make the UI easier
- remove tests to make builds pass
