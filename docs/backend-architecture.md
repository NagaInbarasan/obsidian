# Backend Architecture

## 1. API Architecture
We will use a RESTful API architecture built on **Node.js** and **Express**, written in **TypeScript**. 
Endpoints will follow resource-oriented conventions and use standard HTTP methods and status codes.

### Folder Structure
```text
src/
├── config/         # Environment vars, database config, etc.
├── controllers/    # Route handlers
├── middlewares/    # Auth, validation, error handling, rate limiting
├── routes/         # Express router definitions
├── services/       # Core business logic (AI orchestration, matching, scoring)
├── utils/          # Helper functions, AI client wrappers
├── types/          # TypeScript interfaces, custom types
├── schemas/        # Zod validation schemas
├── prisma/         # Prisma schema and migrations
└── tests/          # Unit and integration tests
```

## 2. Database Architecture
**PostgreSQL** with **Prisma ORM** and **pgvector**.
- **pgvector** will be used to store embeddings for text fields like role descriptions, projects, and skills to enable semantic search.
- **Data models:**
  - `User/Employee`: Core profile data
  - `Role`: Target positions and their requirements
  - `Skill`, `SkillCategory`: Standardized skills
  - `EmployeeSkill`: Mapping of employees to skills with proficiency and confidence
  - `SkillEvidence`: Records validating why a user has a skill
  - `Opportunity`, `LearningResource`: Career growth entities
  - `EmbeddingDocument`: Centralized or attached vector representations

## 3. Authentication & Authorization Flow
- **Authentication:** Bearer tokens (JWT) passed in the `Authorization` header. Passwords will be securely hashed (e.g., using bcrypt/argon2).
- **Authorization:** Role-Based Access Control (RBAC). Middleware will verify the token and attach the user payload to the request. Routes will specify required roles (e.g., `Employee` vs `HR` vs `Admin`).
- Security checks enforce that employees can only edit their own profiles, while HR can view workforce analytics.

## 4. API Conventions
- **Routing:** `/api/v1/...`
- **Request Validation:** Incoming request bodies, queries, and params will be validated using **Zod** in middleware before reaching controllers.
- **Responses:** Standardized JSON structure:
  ```json
  {
    "success": true,
    "data": { ... },
    "error": null
  }
  ```

## 5. Error Handling
- Centralized error-handling middleware.
- Custom `AppError` class encapsulating HTTP status codes and operational status.
- Unhandled rejections and exceptions will be logged and process exited gracefully if critical.
- Ensure no sensitive database/internal errors are leaked to the client.

## 6. Validation Strategy
- **Zod** used strictly at the API boundary.
- All AI responses (e.g., from Qwen) will be parsed and validated against Zod schemas before persistence.

## 7. Security Strategy
- **Helmet:** Secure HTTP headers.
- **CORS:** Restrict origin access to the frontend application.
- **Rate Limiting:** Global rate limit, with stricter limits on resource-intensive `/api/ai/*` endpoints.
- **Input Sanitization:** Prevent NoSQL/SQL injection via ORM (Prisma inherently parameterizes).
- **Secrets Management:** `dotenv` for `.env`. No secrets hardcoded.

## 8. Testing Strategy
- **Framework:** `Vitest` (or `Jest`).
- **Unit Tests:** For deterministic scoring logic, AI output parsing, and pure functions.
- **Integration Tests:** (Using `supertest`) For testing API endpoints, authentication, and database state transitions.
- **Mocks:** Mock Ollama responses to ensure CI/test environments do not require an active LLM.
