# Authorization Model — Obsidian Backend

## Roles

| Role | Description |
|------|-------------|
| `EMPLOYEE` | Standard user. Can view and manage their own data only. |
| `HR` | HR operator. Can view all employee profiles and role matches. |
| `ADMIN` | Full access. Can promote roles, manage users, and view all data. |

> **Note:** Roles are embedded in the JWT at login time and read from the trusted server-side JWT payload. Clients cannot self-assign roles. Roles are stored in the `Employee.systemRole` field.

---

## Role Assignment

- Default role on registration: `EMPLOYEE`
- Role promotion is NOT available via the registration endpoint
- Future: An `ADMIN`-only `PATCH /api/v1/employees/:id/role` endpoint should be added

---

## Permissions by Endpoint

| Endpoint | Auth Required | Role Required | Ownership Check |
|----------|--------------|---------------|-----------------|
| `POST /api/v1/auth/register` | No | None | N/A |
| `POST /api/v1/auth/login` | No | None | N/A |
| `GET /api/v1/auth/me` | Yes | Any | N/A |
| `GET /api/v1/employees` | Yes | Any | No (list is non-sensitive) |
| `GET /api/v1/employees/:id` | Yes | Any | No (basic info only, no sensitive fields) |
| `GET /api/v1/employees/:id/profile` | Yes | Own or HR/ADMIN | Yes — Employee can only view own full profile |
| `GET /api/v1/employees/:id/matches` | Yes | Own or HR/ADMIN | Yes — Employee can only view own matches |
| `GET /api/v1/roles` | Yes | Any | No |
| `GET /api/v1/roles/:id` | Yes | Any | No |
| `GET /api/v1/roles/:id/matches` | Yes | HR or ADMIN | No (intentionally restricted) |
| `GET /api/v1/skills` | Yes | Any | No |
| `GET /api/v1/learning-resources` | Yes | Any | No |

---

## Ownership Rules

An **ownership check** means: the requesting user's `id` (from JWT) must match the resource's `employeeId`, OR the user must have `HR` or `ADMIN` role.

```
req.user.id === resourceOwnerId
OR req.user.role IN ['HR', 'ADMIN']
```

This is implemented centrally in `src/middlewares/auth.middleware.ts` via `requireOwnerOrRole()`.

---

## Sensitive Fields

The following fields must never appear in API responses:

| Field | Model | Protection |
|-------|-------|-----------|
| `passwordHash` | `Employee` | Excluded via explicit Prisma `select` in all service methods |

---

## Mass Assignment Protection

The following fields are **not accepted** from client request bodies:

| Field | Risk |
|-------|------|
| `systemRole` | Role escalation — ADMIN only, via dedicated endpoint |
| `passwordHash` | Bypass password hashing |
| `id` | ID tampering |
| `createdAt` | Timestamp manipulation |
