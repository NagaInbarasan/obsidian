import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Skill Categories
  const catBackend = await prisma.skillCategory.upsert({
    where: { name: 'Backend Engineering' },
    update: {},
    create: { name: 'Backend Engineering', description: 'Server-side technologies' },
  });

  const catAI = await prisma.skillCategory.upsert({
    where: { name: 'Artificial Intelligence' },
    update: {},
    create: { name: 'Artificial Intelligence', description: 'AI, ML, and Data Science' },
  });

  // 2. Create Skills
  const skillNode = await prisma.skill.upsert({
    where: { name: 'Node.js' },
    update: {},
    create: { name: 'Node.js', normalizedName: 'node.js', categoryId: catBackend.id },
  });

  const skillPython = await prisma.skill.upsert({
    where: { name: 'Python' },
    update: {},
    create: { name: 'Python', normalizedName: 'python', categoryId: catBackend.id },
  });

  // 3. Create Employee
  const alice = await prisma.employee.upsert({
    where: { email: 'alice@obsidian.test' },
    update: {},
    create: {
      email: 'alice@obsidian.test',
      firstName: 'Alice',
      lastName: 'Smith',
      title: 'Backend Engineer',
      department: 'Engineering',
      bio: 'Loves writing scalable APIs.',
    },
  });

  // 4. Create Employee Skills & Evidence
  const aliceNodeSkill = await prisma.employeeSkill.upsert({
    where: { employeeId_skillId: { employeeId: alice.id, skillId: skillNode.id } },
    update: {},
    create: {
      employeeId: alice.id,
      skillId: skillNode.id,
      level: 4,
      confidence: 0.9,
      status: 'explicit',
    },
  });

  await prisma.skillEvidence.create({
    data: {
      employeeSkillId: aliceNodeSkill.id,
      type: 'project',
      text: 'Built the core API using Express and Node.js.',
    },
  });

  // 5. Create Role
  const backendRole = await prisma.role.create({
    data: {
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      description: 'Responsible for core backend services.',
    },
  });

  // 6. Create Role Skill Requirements
  await prisma.roleSkill.create({
    data: {
      roleId: backendRole.id,
      skillId: skillNode.id,
      weight: 0.8,
      required: true,
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
