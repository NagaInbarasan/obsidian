# Security Audit — Obsidian Backend
**Date:** 2026-09-19  
**Auditor:** B4 — Authentication & Security Agent  
**Scope:** `src/` — Express/TypeScript backend

---

## 1. Authentication

### What Exists
- JWT-based stateless authentication via `jsonwebtoken`.
- Passwords hashed with `bcrypt` (salt rounds: 10). ✅
- `authenticate` middleware verifies Bearer tokens and populates `req.user` from trusted JWT payload. ✅
- Auth routes: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`. ✅
- `passwordHash` excluded from all API responses. ✅

### Findings

| ID | Severity | Finding |
|----|----------|---------|
| A1 | **High** | `jwtSecret` falls back to `'fallback-secret-for-development-only'` when `JWT_SECRET` env var is absent. In production this would be an insecure hardcoded secret. |
| A2 | **Medium** | No logout/token invalidation mechanism. JWTs are stateless; a stolen token remains valid until expiry (24h). Acceptable for prototype — must be addressed before production with a token blacklist or refresh-token rotation strategy. |
| A3 | **Medium** | JWT `expiresIn` is 24 hours. No refresh token mechanism. |
| A4 | **Low** | Registration allows specifying `systemRole` in request body. A client can self-register as `ADMIN` or `HR`. **This is a critical mass-assignment vulnerability.** |
| A5 | **Low** | No email verification step. Any email address can be used without confirmation. Acceptable for prototype. |

---

## 2. Authorization

### What Exists
- `requireRole` middleware exists in `auth.middleware.ts` but is **not applied to any route** other than in its definition. ✅ Defined.
- `getEmployeeProfile` has a commented-out ownership check. ❌ Not enforced.
- `getEmployeeMatches` has no ownership check. ❌ IDOR vulnerability.

### Findings

| ID | Severity | Finding |
|----|----------|---------|
| Z1 | **High** | `GET /api/v1/employees/:id/profile` — ownership check is commented out. Any authenticated user can read any employee's full profile including career goals and skill evidence. |
| Z2 | **High** | `GET /api/v1/employees/:id/matches` — no ownership or role check. Any user can access any employee's role match data. |
| Z3 | **High** | `GET /api/v1/employees/:id` — returns full Employee DB object including `passwordHash` (see service). |
| Z4 | **Medium** | `GET /api/v1/roles/:id/matches` — lists employees matched to a role. No HR/ADMIN role check. Any authenticated employee can enumerate all candidates for every role. |
| Z5 | **Low** | `requireRole` is defined but unused. |

---

## 3. API Security

### Findings

| ID | Severity | Finding |
|----|----------|---------|
| S1 | **High** | `getEmployeeById` in `employee.service.ts` uses `findUnique` with no `select` — returns all fields including `passwordHash` to callers. |
| S2 | **High** | Registration endpoint accepts `systemRole` from user input (mass assignment). |
| S3 | **Medium** | Rate limiting is explicitly commented out in `app.ts` with "omitted for test". The library `express-rate-limit` is installed but unused. Must be re-enabled. |
| S4 | **Medium** | CORS is configured with `cors()` and no options — allows all origins. Needs tightening for production. |
| S5 | **Medium** | `express.json()` has no `limit` option — accepts arbitrarily large request bodies. |
| S6 | **Low** | `limit` query parameter has no maximum cap. A client can request `?limit=1000000` records. |
| S7 | **Low** | `console.error('Unhandled Error:', err)` in `errorHandler` may log sensitive internal data. Acceptable for prototype but needs log sanitization in production. |

---

## 4. Database Security

### Findings

| ID | Severity | Finding |
|----|----------|---------|
| D1 | **Medium** | `passwordHash` field exists on the `Employee` model and is not excluded by default in Prisma queries. Services must always `select` or omit sensitive fields explicitly. |

---

## 5. Secrets

- No `.env` file found (no committed secrets). ✅
- No `.gitignore` found. ⚠️ Must be created to prevent `.env` from being committed.
- `jwtSecret` fallback in `config/index.ts` is a dev convenience but dangerous if left in production. **Documented as A1.**
- No committed API keys, tokens, or passwords found. ✅

---

## 6. Fixes Applied (see below)

- A4 / S2: Removed `systemRole` from registration schema — only admins may promote roles via a separate endpoint.
- Z1: Enforced ownership check on `getEmployeeProfile` (HR/ADMIN may bypass).
- Z2: Enforced ownership check on `getEmployeeMatches`.
- Z3 / S1: Added explicit `select` in `getEmployeeById` to exclude `passwordHash`.
- Z4: Added `requireRole(['HR','ADMIN'])` on `GET /roles/:id/matches`.
- S3: Re-enabled rate limiting in `app.ts` (relaxed for test environment only).
- S5: Added `express.json({ limit: '100kb' })`.
- S6: Added max cap on `limit` parameter (100 records).
- A1: Added startup guard that throws if `JWT_SECRET` is not set in production.
- `.gitignore` and `.env.example` created.
