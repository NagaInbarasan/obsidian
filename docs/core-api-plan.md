# Core API Implementation Plan

## Overview
This document outlines the planned endpoints, route groups, controllers, services, middleware, and testing requirements for the core API of the Obsidian project. 

## Endpoints

### Employees
- `GET /api/v1/employees` - List all employees (paginated, basic info).
- `GET /api/v1/employees/:id` - Get basic employee profile.
- `GET /api/v1/employees/:id/profile` - Get full employee profile including experiences, projects, and skills.
- `GET /api/v1/employees/:id/matches` - Get stored role matches for an employee.
- `GET /api/v1/employees/:id/gaps` - Get skill gaps for an employee vs their career goals.

### Roles
- `GET /api/v1/roles` - List all roles (paginated).
- `GET /api/v1/roles/:id` - Get role details and skill requirements.
- `GET /api/v1/roles/:id/matches` - Get employees matched to this role.

### Skills
- `GET /api/v1/skills` - List all skills (paginated, categorized).

### Learning Resources
- `GET /api/v1/learning-resources` - List learning resources.

## Route Groups
- `/api/v1/employees` -> `src/routes/employee.routes.ts`
- `/api/v1/roles` -> `src/routes/role.routes.ts`
- `/api/v1/skills` -> `src/routes/skill.routes.ts`
- `/api/v1/learning-resources` -> `src/routes/learning.routes.ts`

## Controllers
- `employee.controller.ts`: Handles requests related to employees.
- `role.controller.ts`: Handles role-related requests.
- `skill.controller.ts`: Handles skill-related requests.
- `learning.controller.ts`: Handles learning-resource requests.

## Services
- `employee.service.ts`: Business logic for retrieving employee data, profiles, and computing skill gaps.
- `role.service.ts`: Business logic for retrieving roles.
- `skill.service.ts`: Business logic for retrieving skills.
- `learning.service.ts`: Business logic for retrieving learning resources.

## Middleware
- `error.middleware.ts`: Centralized error handling.
- `validation.middleware.ts`: Zod schema validation for query/params/body.
- `auth.middleware.ts`: (To be fully implemented by B4, I will provide a mock/stub that expects a JWT and passes `req.user`).

## Validation
- Zod schemas for pagination (`page`, `limit`).
- Zod schemas for UUID validation (`id` param).
- Zod schemas for basic filtering strings.

## Response Formats
- Success: `{ "success": true, "data": { ... }, "message": "Optional" }`
- Error: `{ "success": false, "error": { "code": "...", "message": "..." } }`
- Paginated: `{ "success": true, "data": [], "pagination": { "page": 1, "limit": 20, "total": 100 } }`

## Authentication / Authorization Dependencies
- Will assume `req.user` is populated by B4's middleware.
- Will implement endpoints so that they check ownership boundaries if necessary.

## Testing Requirements
- Unit tests for services (especially skill gap calculation).
- Integration tests using `supertest` for all core API endpoints.
