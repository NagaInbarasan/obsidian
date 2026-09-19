import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const testDbUrl = process.env.TEST_DATABASE_URL;

// Tests will skip if TEST_DATABASE_URL is not provided.
// In CI environments, TEST_DATABASE_URL must be set to ensure tests run and do not silently pass.
describe.skipIf(!testDbUrl)('Database Integration Tests (B5)', () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    // 1. Apply current migrations to the isolated test database
    if (testDbUrl) {
      execSync('npx prisma migrate deploy', {
        env: { ...process.env, DATABASE_URL: testDbUrl },
        stdio: 'inherit'
      });
    }

    // 2. Initialize PrismaClient pointing to the test database
    prisma = new PrismaClient({
      datasources: {
        db: { url: testDbUrl }
      }
    });
    await prisma.$connect();
  });

  afterAll(async () => {
    // Clean up test data
    if (prisma) {
      await prisma.roleMatch.deleteMany();
      await prisma.employeeCareerGoal.deleteMany();
      await prisma.learningResource.deleteMany();
      await prisma.roleSkill.deleteMany();
      await prisma.role.deleteMany();
      await prisma.skillEvidence.deleteMany();
      await prisma.employeeSkill.deleteMany();
      await prisma.skill.deleteMany();
      await prisma.skillCategory.deleteMany();
      await prisma.project.deleteMany();
      await prisma.employeeExperience.deleteMany();
      await prisma.employee.deleteMany();
      await prisma.$disconnect();
    }
  });

  it('should successfully perform CRUD on Employee', async () => {
    const employee = await prisma.employee.create({
      data: {
        email: 'test-integration@example.com',
        firstName: 'Integration',
        lastName: 'Test',
        passwordHash: 'dummyhash',
        systemRole: 'EMPLOYEE'
      }
    });
    expect(employee.id).toBeDefined();
    expect(employee.email).toBe('test-integration@example.com');

    const found = await prisma.employee.findUnique({ where: { id: employee.id } });
    expect(found).not.toBeNull();
    expect(found?.firstName).toBe('Integration');

    const updated = await prisma.employee.update({
      where: { id: employee.id },
      data: { title: 'Senior Tester' }
    });
    expect(updated.title).toBe('Senior Tester');

    await prisma.employee.delete({ where: { id: employee.id } });
    const deleted = await prisma.employee.findUnique({ where: { id: employee.id } });
    expect(deleted).toBeNull();
  });

  it('should enforce unique email constraint', async () => {
    await prisma.employee.create({
      data: {
        email: 'unique@example.com',
        firstName: 'A',
        lastName: 'B',
        passwordHash: 'hash'
      }
    });

    await expect(
      prisma.employee.create({
        data: {
          email: 'unique@example.com',
          firstName: 'C',
          lastName: 'D',
          passwordHash: 'hash2'
        }
      })
    ).rejects.toThrow(/Unique constraint failed on the fields: \(`email`\)/);
  });

  it('should manage relations correctly (Skills & Categories)', async () => {
    const category = await prisma.skillCategory.create({
      data: { name: 'Integration Tools' }
    });

    const skill = await prisma.skill.create({
      data: {
        name: 'Database Integration',
        normalizedName: 'database integration',
        categoryId: category.id
      }
    });

    expect(skill.categoryId).toBe(category.id);

    const retrievedSkill = await prisma.skill.findUnique({
      where: { id: skill.id },
      include: { category: true }
    });

    expect(retrievedSkill?.category?.name).toBe('Integration Tools');
  });

  it('should support pgvector extensions and vector operations', async () => {
    // 1. Verify the extension exists
    // The migration should have already created it. 
    // We execute CREATE EXTENSION IF NOT EXISTS to ensure it doesn't fail.
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS vector;`;

    // 2. Insert a Role with a vector embedding
    const roleId = '00000000-0000-4000-8000-000000000005';
    // Use raw query since vector fields are Unsupported in the Prisma Client
    await prisma.$executeRaw`
      INSERT INTO "Role" ("id", "title", "department", "description", "embedding", "updatedAt") 
      VALUES (${roleId}, 'AI Engineer', 'Engineering', 'Works with vectors', '[1,2,3]'::vector, NOW());
    `;

    // 3. Query using a vector operation (e.g. cosine distance <=>)
    const result = await prisma.$queryRaw<{id: string, title: string, dist: number}[]>`
      SELECT "id", "title", ("embedding" <=> '[1,2,3]'::vector) as dist
      FROM "Role"
      WHERE "id" = ${roleId}
      ORDER BY dist ASC
      LIMIT 1;
    `;

    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(roleId);
    expect(result[0].title).toBe('AI Engineer');
    // Distance between identical vectors should be 0
    expect(result[0].dist).toBeCloseTo(0);
  });
});
