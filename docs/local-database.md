# Obsidian Local Database Setup

This guide explains how to set up the local development database for the Obsidian backend. 

## Requirements

- **Docker** and **Docker Compose** must be installed.
- The schema uses the `pgvector` extension, so a standard PostgreSQL installation is insufficient. We use `pgvector/pgvector:pg16`.

## Setup Steps

1. **Start the Database**
   Run the following command from the repository root:
   ```bash
   docker-compose up -d
   ```
   This provisions:
   - **Engine:** PostgreSQL 16 with pgvector
   - **Database Name:** `obsidian`
   - **User:** `obsidian`
   - **Password:** `development-only`
   - **Port:** `5432`

2. **Environment Variables**
   Ensure your `.env` file (which should never be committed) matches `.env.example`:
   ```env
   DATABASE_URL="postgresql://obsidian:development-only@localhost:5432/obsidian?schema=public"
   JWT_SECRET="super-secret-development-jwt-key"
   ```

3. **Apply Migrations**
   Initialize the database schema:
   ```bash
   npx prisma migrate dev
   ```
   *Note: Do NOT run `npx prisma migrate reset` unless you intend to completely destroy your local data.*

4. **Seed the Database**
   Populate the database with safe, fake development data:
   ```bash
   npx prisma db seed
   ```
   This script uses `upsert` operations, making it safe to run multiple times without duplicating core entities.

## Testing the Database

To verify the database connection and the `pgvector` extension:

1. Ensure the test database is running (refer to `docs/integration-environment.md`).
2. Run the tests:
   ```bash
   npx vitest run --testPathPattern=integration
   ```

## Resetting the Database Safely

If you need a completely clean slate, you can tear down the container and its volumes:

```bash
# WARNING: This deletes all local database data
docker-compose down -v
docker-compose up -d
npx prisma migrate dev
npx prisma db seed
```
