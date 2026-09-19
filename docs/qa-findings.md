# QA Findings (B6)

Currently, there are no active, unresolved bugs found during the QA phase. 

Previous security findings (Z1, Z2, Z4, A4, S2, S6) related to IDOR, mass assignment, RBAC, and pagination resource exhaustion were successfully fixed by other agents, and regression tests were added in `tests/security.test.ts` to ensure they do not return.

## Resolved Bugs
*   **Z1 (IDOR on Employee Profile):** Unauthenticated/unauthorized users could view employee profiles. **Fix verified.**
*   **Z2 (IDOR on Employee Matches):** Unauthorized users could view role matches for other employees. **Fix verified.**
*   **Z4 (RBAC on Role Matches):** Standard employees could view role matches for any role. **Fix verified.**
*   **A4/S2 (Mass Assignment on Registration):** System role could be provided during registration to elevate privileges. **Fix verified.**
*   **S6 (Pagination Resource Exhaustion):** Limit was unbounded, leading to potential DoS. **Fix verified.**

No new bugs were introduced during the latest unit/integration test additions.
