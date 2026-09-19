# Agent Handoff: B3 (Core API)

## To B4 (Authentication & Security)
- **Middleware Expected:** B3 APIs are wrapped with `router.use(authenticate)`. The stub implementation is in `src/middlewares/auth.middleware.ts`. Please overwrite this with your real JWT/Session validation logic.
- **User Identity:** The B3 controllers expect `req.user` to be populated by the auth middleware with at least `{ id: string, role: string }`.
- **Protected Endpoints:** All `/api/v1/*` routes currently require authentication. 
- **Authorization:** `EmployeeController.getEmployeeProfile` has a placeholder logic block that expects to enforce boundaries (employees can only view their own full profile unless they are HR). Please implement a robust RBAC in `auth.middleware.ts` (e.g. `requireRole`) that can be used across routes.

## To B5 (AI / Intelligence Integration)
- **API Ready:** The Core CRUD endpoints for Employees, Roles, Skills, and Learning Resources are ready.
- **Database Access:** Use the standard Prisma client configured in `src/utils/prisma.ts`.
- **Response Format:** Please use the `sendSuccess` and `sendError` helpers from `src/utils/response.ts` to maintain consistency across AI endpoints (e.g., `/api/v1/ai/extract-skills`).
- **Integration Requirements:** Your AI controllers should be placed in `src/controllers/ai.controller.ts` and routes mounted on `/api/v1/ai` in `src/app.ts`.

## To Frontend Agent
- **Endpoint List:** See `docs/api-contract.md` for the exact structures.
- **Errors:** Handled gracefully. If `success: false` is returned, expect an `error` object with `code` and `message`.
- **Pagination:** Supported on all list endpoints using `?page=1&limit=20`. Check the `pagination` object in the response.
