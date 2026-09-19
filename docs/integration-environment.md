# Database Integration Environment

To run true database integration tests, Obsidian requires a running PostgreSQL database with the `pgvector` extension installed.

## Setup Instructions

We use `docker-compose` to spin up a safe, isolated local test environment. **Do not use your production database for integration tests.**

1. Ensure Docker and Docker Compose are installed on your machine.
2. From the project root, start the test database:

```bash
docker-compose -f docker-compose.test.yml up -d
```

This starts a container named `test-db` running `pgvector/pgvector:pg16` on `localhost:5433` with:
- **User:** `testuser`
- **Password:** `testpassword`
- **Database:** `testdb`
- **Storage:** `tmpfs` (for speed and complete isolation; data is destroyed when container stops)

3. Create a `.env.test` file (or set environment variables in your CI):

```env
TEST_DATABASE_URL="postgresql://testuser:testpassword@localhost:5433/testdb?schema=public"
```

4. Run the integration tests:

```bash
npx vitest run --testPathPattern=integration
```
The integration test suite (`database.integration.test.ts`) automatically applies migrations using `npx prisma migrate deploy` against the `TEST_DATABASE_URL` before running tests, and cleans up safely.

## Teardown

To stop and remove the test database:

```bash
docker-compose -f docker-compose.test.yml down
```
