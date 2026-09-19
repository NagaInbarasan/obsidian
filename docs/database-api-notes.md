# Database-API Notes

## 1. Entities Exposed via API
- **Employee & Profile:** The `Employee` entity is the core. The `EmployeeExperience`, `Project`, and `EmployeeSkill` entities should be returned as nested/related structures under an `/api/employees/:id/profile` endpoint.
- **Roles:** The `Role` entity, combined with `RoleSkill`, defines target opportunities. 
- **Skills:** `Skill` and `SkillCategory` provide the global skill catalog.

## 2. API Contract Considerations
- **Vector Embeddings (`embedding` field):** The raw vector embeddings (`Unsupported("vector")`) should **NEVER** be returned in any API response. Exclude these from DTOs. They are strictly for backend similarity search.
- **Pagination & Search:** Queries on `Employee`, `Role`, and `Skill` lists must support pagination (e.g., `skip` and `take` via Prisma) and basic filtering.
- **Skill Level:** The API must strictly enforce that the `level` of `EmployeeSkill` is between 1 and 5.

## 3. Authentication & Authorization
- **Employee Access:** Employees can read their own profile and create evidence/goals. They cannot edit their `roleMatches` scores directly, nor overwrite global `Skill` ontology.
- **HR Access:** HR users (once a role system is fully implemented in the API layer) can read all employee profiles and compute skill gaps.

## 4. Query Performance (N+1 Risks)
- When fetching an employee profile, API endpoints should `include` relations explicitly rather than doing separate database calls:
  ```ts
  prisma.employee.findUnique({
    where: { id },
    include: {
      skills: { include: { skill: true, evidence: true } },
      experiences: true,
      projects: true
    }
  })
  ```
- Avoid deeply nesting includes beyond 2-3 levels to prevent overly complex/slow joins.

## 5. Destructive Operations
- The API should generally use soft-deletes or avoid deletes entirely for core evidence. Prisma currently has `onDelete: Cascade` for employee-owned records, meaning deleting an employee deletes their evidence. This is expected behavior.
