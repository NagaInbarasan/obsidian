# Full Stack Integration

## Architecture

```text
Frontend (React/Vite/Tailwind)
   ↓ (fetchApi client with Bearer Token)
Backend API (Express/Node.js on port 3000)
   ↓ (Prisma ORM)
Prisma
   ↓
PostgreSQL + pgvector (Docker on port 5432)
```

## Local Startup

### 1. Database
```bash
docker-compose up -d
```

### 2. Backend
```bash
# From the root directory (obsidian/)
npm install
npm run build
npm start
```

### 3. Frontend
```bash
# From the frontend directory (obsidian/frontend)
npm install
npm run dev
```

## Environment Variables

### Backend `.env`
- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- `ALLOWED_ORIGINS`

### Frontend `.env`
- `VITE_API_URL`

## API Integration

The following features have been successfully mapped from the frontend mock APIs to the backend API via the `fetchApi` client:

- **Employees**: `fetchEmployees` mapped to `GET /api/v1/employees`. `fetchEmployeeById` mapped to `GET /api/v1/employees/:id/profile`.
- **Roles**: `fetchRoles` mapped to `GET /api/v1/roles`. `fetchRoleById` mapped to `GET /api/v1/roles/:id`. `fetchRoleMatch` mapped to `GET /api/v1/employees/:id/matches`.
- **Authentication**: `loginApi` mapped to `POST /api/v1/auth/login`.

## Authentication

The frontend utilizes a centralized API client `src/services/api/client.ts` that automatically reads `obsidian_token` from `localStorage` and attaches it as a `Bearer` token to the `Authorization` header for all requests. Login API requests update the token and redirect the user based on their role (`EMPLOYEE` or `HR`). 

## Database

Frontend data directly corresponds to the PostgreSQL schema. The backend Prisma models parse the database contents, which are safely presented to the frontend through the backend's explicit response payloads (excluding sensitive fields like `passwordHash`).

## Known Issues

- The sandbox environment does not have Docker installed, which prevents the local database container from spinning up and verifying live e2e browser flows.
- Some HR/Career API endpoints (like internal mobility, role demand, emerging skill demand) currently return mocked data on the frontend because corresponding specialized analytics routes do not yet exist on the backend.
