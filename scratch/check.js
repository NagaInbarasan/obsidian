const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: { url: 'postgresql://postgres:postgres@localhost:5432/postgres' }
  }
});

async function main() {
  const exts = await prisma.$queryRaw`SELECT extname FROM pg_extension`;
  console.log(exts);
  
  try {
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS vector`;
    console.log("pgvector is available.");
  } catch (e) {
    console.log("pgvector NOT available:", e.message);
  }
}

main().finally(() => prisma.$disconnect());
