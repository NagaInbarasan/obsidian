import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding realistic development data...');

  // Wipe existing data
  await prisma.roleMatch.deleteMany({});
  await prisma.roleSkill.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.skillEvidence.deleteMany({});
  await prisma.employeeSkill.deleteMany({});
  await prisma.employeeExperience.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.employeeCareerGoal.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.skillCategory.deleteMany({});
  await prisma.learningResource.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 12);

  // 1. Categories
  const categories = [
    { name: 'Backend Engineering', description: 'Server-side technologies' },
    { name: 'Frontend Engineering', description: 'Client-side technologies' },
    { name: 'Data & AI', description: 'Machine Learning and Data Science' },
    { name: 'Infrastructure & DevOps', description: 'Cloud and Deployment' },
    { name: 'Design & Product', description: 'UX, UI, and Product Management' },
  ];
  
  const createdCats = [];
  for (const c of categories) {
    createdCats.push(await prisma.skillCategory.create({ data: c }));
  }

  // 2. Skills (30+)
  const skillNames = [
    ['Node.js', 'Python', 'Java', 'Go', 'C++', 'Ruby on Rails', 'GraphQL', 'REST API', 'Microservices'],
    ['React', 'TypeScript', 'JavaScript', 'Vue.js', 'Angular', 'Tailwind CSS', 'Figma'],
    ['Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Data Analysis', 'SQL', 'PostgreSQL', 'Pandas'],
    ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Linux'],
    ['Product Strategy', 'Agile', 'Scrum', 'User Research', 'Wireframing']
  ];

  const allSkills = [];
  for (let i = 0; i < createdCats.length; i++) {
    for (const sName of skillNames[i]) {
      const s = await prisma.skill.create({
        data: { name: sName, normalizedName: sName.toLowerCase(), categoryId: createdCats[i].id }
      });
      allSkills.push(s);
    }
  }

  // 3. Departments
  const departments = ['Engineering', 'Data', 'Product', 'Design', 'Infrastructure', 'Human Resources'];

  // 4. Employees (25 employees)
  const allEmployees = [];
  
  // Create Alice and Admin manually first
  const alice = await prisma.employee.create({
    data: {
      email: 'alice@obsidian.test',
      firstName: 'Alice',
      lastName: 'Smith',
      title: 'Backend Engineer',
      department: 'Engineering',
      bio: 'Passionate about distributed systems.',
      passwordHash,
      systemRole: 'EMPLOYEE'
    },
  });
  allEmployees.push(alice);

  const admin = await prisma.employee.create({
    data: {
      email: 'admin@obsidian.test',
      firstName: 'Sarah',
      lastName: 'Connor',
      title: 'HR Business Partner',
      department: 'Human Resources',
      bio: 'Building the best team.',
      passwordHash,
      systemRole: 'HR'
    }
  });
  allEmployees.push(admin);

  // Generate 23 more random employees
  for (let i = 0; i < 23; i++) {
    const fn = faker.person.firstName();
    const ln = faker.person.lastName();
    const dept = faker.helpers.arrayElement(departments);
    const title = dept === 'Engineering' ? 'Software Engineer' : dept === 'Data' ? 'Data Scientist' : dept === 'Product' ? 'Product Manager' : 'Specialist';
    
    const e = await prisma.employee.create({
      data: {
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@obsidian.test`,
        firstName: fn,
        lastName: ln,
        title: faker.helpers.arrayElement(['Junior', 'Mid-Level', 'Senior', 'Lead']) + ' ' + title,
        department: dept,
        bio: faker.person.bio(),
        passwordHash,
        systemRole: 'EMPLOYEE'
      }
    });
    allEmployees.push(e);
  }

  // 5. Employee Skills (100+) & Experiences & Projects
  for (const emp of allEmployees) {
    const numSkills = faker.number.int({ min: 3, max: 8 });
    const empSkills = faker.helpers.arrayElements(allSkills, numSkills);
    
    for (const skill of empSkills) {
      await prisma.employeeSkill.create({
        data: {
          employeeId: emp.id,
          skillId: skill.id,
          level: faker.number.int({ min: 2, max: 5 }),
          confidence: faker.number.float({ min: 0.5, max: 1 }),
          status: faker.helpers.arrayElement(['explicit', 'inferred']),
        }
      });
    }

    // Add experiences
    await prisma.employeeExperience.create({
      data: {
        employeeId: emp.id,
        company: faker.company.name(),
        title: emp.title || 'Engineer',
        description: faker.lorem.paragraph(),
        startDate: faker.date.past({ years: 5 }),
      }
    });

    // Add projects
    await prisma.project.create({
      data: {
        employeeId: emp.id,
        name: faker.commerce.productName() + ' Migration',
        description: faker.lorem.sentence(),
        startDate: faker.date.past({ years: 2 }),
      }
    });
  }

  // 6. Roles (12 Roles)
  const roleTitles = [
    'Senior Backend Engineer', 'Frontend Lead', 'Data Scientist', 'ML Engineer', 
    'DevOps Engineer', 'Product Manager', 'UI/UX Designer', 'Cloud Architect',
    'Full Stack Developer', 'Security Engineer', 'Data Analyst', 'Engineering Manager'
  ];

  const allRoles = [];
  for (const rt of roleTitles) {
    const r = await prisma.role.create({
      data: {
        title: rt,
        department: faker.helpers.arrayElement(departments),
        description: faker.lorem.paragraphs(2),
      }
    });
    allRoles.push(r);

    // Attach skills to role
    const reqSkills = faker.helpers.arrayElements(allSkills, faker.number.int({ min: 3, max: 6 }));
    for (const s of reqSkills) {
      await prisma.roleSkill.create({
        data: {
          roleId: r.id,
          skillId: s.id,
          weight: faker.number.float({ min: 0.5, max: 1 }),
          required: faker.datatype.boolean(),
        }
      });
    }
  }

  // 7. Matches (50 matches)
  for (const emp of allEmployees) {
    // Generate 2 matches per employee
    const matchedRoles = faker.helpers.arrayElements(allRoles, 2);
    for (const r of matchedRoles) {
      await prisma.roleMatch.create({
        data: {
          employeeId: emp.id,
          roleId: r.id,
          score: faker.number.float({ min: 0.4, max: 0.99 }),
          scoringVersion: 'v1.2',
          matchedSkills: JSON.stringify([faker.helpers.arrayElement(allSkills).name]),
          missingSkills: JSON.stringify([faker.helpers.arrayElement(allSkills).name])
        }
      });
    }
  }

  // 8. Learning Resources (15)
  for (let i = 0; i < 15; i++) {
    await prisma.learningResource.create({
      data: {
        title: faker.company.catchPhrase() + ' Course',
        provider: faker.helpers.arrayElement(['Pluralsight', 'Udemy', 'Coursera', 'Internal']),
        url: faker.internet.url(),
        type: faker.helpers.arrayElement(['course', 'article', 'book'])
      }
    });
  }

  console.log('Seeding finished successfully. Huge dataset created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
