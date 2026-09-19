# Frontend Database Handoff

This document provides all necessary details for the frontend team to connect to the Obsidian backend and consume its seeded data.

## Backend Connection

- **API Base URL:** `http://localhost:3000/api/v1`
- **Starting the Backend:**
  1. Ensure the database is running: `docker-compose up -d`
  2. Start the development server: `npm run dev` (or build and run with `npm run build && npm start`)

## Authentication Requirements

All protected endpoints require a JWT token passed in the `Authorization` header:
```text
Authorization: Bearer <token>
```

Currently, authentication can be bypassed in local tests using valid mock tokens or by hitting the `/api/v1/auth/login` endpoint with seeded user credentials.

## Available Seeded Data

The `prisma db seed` command populates the database with realistic but entirely fake development data. 

### Important Entities Created

1. **Skill Categories & Skills**
   - Backend Engineering (Node.js, Python)
   - Artificial Intelligence

2. **Example Accounts (Employees)**
   - **Email:** `alice@obsidian.test`
   - **Name:** Alice Smith
   - **Role:** Backend Engineer
   *(Note: The current seed does not hardcode passwords. For local testing of login flows, either create a user via the registration endpoint, or adjust the seed to include a hashed password known to development).*

3. **Roles**
   - Senior Backend Engineer (Requires Node.js)

4. **Employee Skills & Evidence**
   - Alice has a level 4 Node.js skill backed by a "project" evidence record.

## Available API Endpoints

- **Auth:** `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- **Employees:** `GET /employees`, `GET /employees/:id`, `GET /employees/:id/profile`, `GET /employees/:id/matches`
- **Skills:** `GET /skills`, `GET /skills/:id`
- **Roles:** `GET /roles`, `GET /roles/:id`, `GET /roles/:id/matches`
- **Learning:** `GET /learning-resources`

## Next Steps for Frontend

1. Ensure Docker is running.
2. Spin up the database, run migrations, and seed data.
3. Start the backend server on port 3000.
4. Begin integrating your frontend views with the `/api/v1` endpoints using `alice@obsidian.test` for testing profile structures.
