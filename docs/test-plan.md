# Obsidian Test Plan (B6)

## Overview
This test plan outlines the strategy for ensuring the quality, security, and stability of the Obsidian backend, adhering to the Testing Pyramid principles.

## 1. Unit Tests
*   **Target:** Business logic, services, and utilities.
*   **Strategy:** Isolate units using mocks for external dependencies and the database.
*   **Focus Areas:**
    *   Authentication service logic (JWT generation, verification, password hashing).
    *   Authorization logic (RBAC checks, permission validations).
    *   Data formatting and transformation utilities.
    *   Complex calculation or mapping logic (e.g., RoleMatch scoring).

## 2. Integration Tests
*   **Target:** Database interactions, services combined, and external service integrations.
*   **Strategy:** Use a realistic database (test environment/isolated schema) to test the Prisma client and database constraints. Do NOT mock the database for these tests.
*   **Focus Areas:**
    *   Prisma schemas and migrations.
    *   CRUD operations on core entities (`Employee`, `Skill`, `Role`).
    *   Database constraints (unique constraints, cascading deletes, foreign keys).
    *   Vector search behavior (pgvector).

## 3. API Tests
*   **Target:** REST API endpoints and HTTP responses.
*   **Strategy:** Use `supertest` to interact with the Express application. Test full request/response lifecycles.
*   **Focus Areas (Per Endpoint):**
    *   **Success:** Valid requests return the expected status (200/201) and structure (e.g., proper pagination, correct types).
    *   **Validation:** Missing, invalid fields, wrong types, invalid UUIDs, bad query parameters. Ensure proper error formats are returned.
    *   **Not Found:** Requests for non-existent resources (404).
    *   **Conflict:** Creation of duplicate unique resources (409).
    *   **Data integrity:** Ensure sensitive fields (like `passwordHash`) do not leak in responses.

## 4. Security Tests
*   **Target:** Authentication and authorization boundaries.
*   **Strategy:** Systematic boundary testing using authenticated and unauthenticated requests.
*   **Focus Areas:**
    *   **Authentication:**
        *   Unauthenticated requests to protected endpoints (401).
        *   Invalid or expired JWT tokens (401).
    *   **Authorization:**
        *   Standard users accessing Admin/HR endpoints (403).
        *   IDOR (Insecure Direct Object Reference): User A accessing/modifying User B's private data (403 or 404 depending on design).
        *   Privilege escalation attempts.
    *   Mass assignment vulnerabilities.

## 5. Regression Tests
*   **Target:** Previously fixed bugs and critical flows.
*   **Strategy:** When a bug is identified and fixed, a specific test case must be added to prevent it from recurring.
*   **Focus Areas:**
    *   Tracked in `qa-findings.md`.
    *   All identified regressions will have dedicated test files or grouped tests.

## 6. Edge Cases
*   **Target:** Unusual, unexpected, or extreme inputs.
*   **Strategy:** Proactively test boundaries that developers often miss.
*   **Focus Areas:**
    *   Empty strings, extremely long strings, null values for optional fields.
    *   Negative numbers, zero (where applicable).
    *   Huge pagination limits (`?limit=9999999`).
    *   Malformed JSON bodies.
    *   Unsupported HTTP methods on valid routes (e.g., POST to a GET-only route).
    *   Deleted or orphaned relationships.
