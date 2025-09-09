import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import 'reflect-metadata';
import { AppDataSource } from '../config/database.config';

declare module 'fastify' {
  interface FastifyInstance {
    orm: typeof AppDataSource;
  }
}

const typeormPlugin: FastifyPluginAsync = async (fastify) => {
  try {
    // Initialize TypeORM connection
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      fastify.log.info('TypeORM connection established successfully');
    }

    // Decorate fastify with the DataSource
    fastify.decorate('orm', AppDataSource);

    // Add hook to close connection when fastify closes
    fastify.addHook('onClose', async () => {
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
        fastify.log.info('TypeORM connection closed');
      }
    });
  } catch (error) {
    fastify.log.error('Error connecting to database:', error);
    throw error;
  }
};

export default fp(typeormPlugin);