# Database Design

## 1. Technology
- **Database:** PostgreSQL
- **Extension:** pgvector (for vector similarity search on roles, skills, learning resources)
- **ORM:** Prisma

## 2. Core Entities

### Employee (User)
- **Purpose:** Core user account and employee profile.
- **Columns:** `id` (UUID PK), `email` (String, Unique), `firstName` (String), `lastName` (String), `title` (String, nullable), `department` (String, nullable), `bio` (Text, nullable), `createdAt`, `updatedAt`
- **Relationships:** One-to-many with EmployeeExperience, Project, EmployeeSkill, EmployeeCareerGoal.

### SkillCategory
- **Purpose:** Broad categorization of skills (e.g., "Frontend", "Backend", "Leadership").
- **Columns:** `id` (UUID PK), `name` (String, Unique), `description` (String, nullable)

### Skill
- **Purpose:** Standardized skills ontology.
- **Columns:** `id` (UUID PK), `name` (String, Unique), `normalizedName` (String, Unique), `categoryId` (UUID FK), `createdAt`, `updatedAt`
- **Relationships:** Many-to-one to SkillCategory. One-to-many to EmployeeSkill.

### EmployeeSkill
- **Purpose:** Mapping of an employee to a skill.
- **Columns:** `id` (UUID PK), `employeeId` (UUID FK), `skillId` (UUID FK), `level` (Int, 1-5), `confidence` (Float, 0-1), `status` (String: 'explicit', 'evidence-backed-inferred', 'potential', 'self-declared'), `createdAt`, `updatedAt`
- **Constraints:** Unique on `(employeeId, skillId)`.
- **Relationships:** One-to-many to SkillEvidence.

### SkillEvidence
- **Purpose:** Proof/justification for why an employee has a specific skill.
- **Columns:** `id` (UUID PK), `employeeSkillId` (UUID FK), `type` (String: 'project', 'experience', 'learning', 'achievement'), `sourceId` (String, generic reference ID), `text` (Text, explanation/extract), `createdAt`

### Role
- **Purpose:** Standardized job positions or target roles within the company.
- **Columns:** `id` (UUID PK), `title` (String), `department` (String), `description` (Text), `embedding` (Unsupported("vector"), for pgvector), `createdAt`, `updatedAt`
- **Relationships:** One-to-many to RoleSkill.

### RoleSkill
- **Purpose:** Requirements for a specific role.
- **Columns:** `id` (UUID PK), `roleId` (UUID FK), `skillId` (UUID FK), `weight` (Float, 0-1 for importance), `required` (Boolean)
- **Constraints:** Unique on `(roleId, skillId)`.

### Project
- **Purpose:** Internal projects employees have worked on.
- **Columns:** `id` (UUID PK), `name` (String), `description` (Text), `embedding` (Unsupported("vector")), `startDate` (DateTime), `endDate` (DateTime, nullable), `employeeId` (UUID FK)

### LearningResource
- **Purpose:** Courses, books, or materials for skill growth.
- **Columns:** `id` (UUID PK), `title` (String), `provider` (String), `url` (String), `type` (String: 'course', 'article', 'book'), `embedding` (Unsupported("vector"))

### RoleMatch
- **Purpose:** Stored snapshot of a deterministic match between an employee and a role.
- **Columns:** `id` (UUID PK), `employeeId` (UUID FK), `roleId` (UUID FK), `score` (Float), `scoringVersion` (String), `matchedSkills` (JSONB), `missingSkills` (JSONB), `createdAt`

## 3. Principles
- **Primary Keys:** UUIDs (`@default(uuid())`).
- **Foreign Keys:** Enforced via Prisma relations (`@relation`).
- **Timestamps:** Standard `@default(now())` and `@updatedAt`.
- **Deletion Behavior:** Cascade deletes from Employee to their personal records (EmployeeSkill, EmployeeExperience), but RESTRICT for core ontology (Skills, Roles).

## 4. Vector Search
Embeddings will be stored using Prisma's `Unsupported("vector")` type in combination with raw SQL queries to perform cosine similarity (`<=>`) or inner product (`<#>`) searches using pgvector.
