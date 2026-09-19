# API Security Requirements — B3 Coordination
**From:** B4 — Authentication & Security  
**To:** B3 — Core API

---

## Summary

This document describes the security changes applied to B3's API layer. These changes were made with minimal disruption to the existing API structure.

---

## Changes to B3 Routes

### `GET /api/v1/employees/:id/profile`
**Before:** Ownership check was commented out — any authenticated user could read any profile.  
**After:** Enforced. Returns `403 FORBIDDEN` if the requesting user is not the profile owner and does not have `HR` or `ADMIN` role.

### `GET /api/v1/employees/:id/matches`
**Before:** No ownership check.  
**After:** Enforced. Same ownership rule as `/profile`. Non-owners get `403 FORBIDDEN`.

### `GET /api/v1/roles/:id/matches`
**Before:** Open to any authenticated user.  
**After:** Restricted to `HR` and `ADMIN` roles. Returns `403 FORBIDDEN` for `EMPLOYEE` role.

---

## Changes to B3 Controllers (all controllers)

All controllers updated from `(req, res)` to `(req, res, next)` with `try/catch` wrapping all async logic. This ensures errors propagate through the central `errorHandler` instead of causing unhandled promise rejections and response hangs.

---

## Changes to B3 Services

### `employee.service.ts`

- `getEmployeeById`: Now uses explicit `select` — `passwordHash` excluded.
- `getEmployeeProfile`: `passwordHash` stripped from response. Project `embedding` vectors excluded.
- `getEmployeeMatches`: Role `embedding` vectors excluded from joined role data.

---

## Pagination Limit Cap

`common.schema.ts` — `limit` query parameter capped at `100`. Requests with `?limit > 100` return `400 VALIDATION_ERROR`.

---

## No Breaking Changes to Public API Shape

All response structures remain identical. The only behavioral change is:
1. Some endpoints now return `403` for unauthorized access (previously permitted).
2. Sensitive fields are stripped from responses (callers never relied on them).
3. The `?limit` param now has a max.

---

## Registration — systemRole Removed

`auth.schema.ts` — `systemRole` field removed from the registration endpoint. Any client sending `systemRole` in the registration body will either have it stripped (Zod passthrough) or receive a `400` if schema is strict. The service always creates users with `systemRole: 'EMPLOYEE'` regardless.

---

## req.user Type

`req.user` is now typed as `AuthUser`:

```typescript
interface AuthUser {
  id: string;    // UUID — the Employee's DB id
  role: string;  // 'EMPLOYEE' | 'HR' | 'ADMIN'
  email: string;
}
```

Downstream agents (B5, B6) should read identity from `req.user.id`, never from `req.body.userId` or `req.query.userId`.
