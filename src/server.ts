import app from './app';
import { config } from './config';
import prisma from './utils/prisma';

const startServer = async () => {
  try {
    // Validate database connection
    await prisma.$connect();
    console.log('Connected to PostgreSQL database');

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
