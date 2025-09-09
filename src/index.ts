import 'reflect-metadata';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import { FastifyRequest, FastifyReply } from 'fastify';
import server from './server';
import app from './app';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    // Register core plugins first
    await server.register(sensible);
    await server.register(cors, { origin: true });

    // Register Swagger documentation (simplified)
    await server.register(swagger, {
      swagger: {
        info: {
          title: 'Investment Platform API',
          version: '1.0.0',
        },
      },
    });

    await server.register(swaggerUI, {
      routePrefix: '/documentation',
    });

    // Add health check route
    server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.code(StatusCodes.OK).send('Fastify + TypeScript');
    });

    // Register the main app plugin
    await server.register(app);

    // Start server
    await server.listen({ port: Number(PORT), host: '0.0.0.0' });
    server.log.info(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

// Handle graceful shutdown
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    try {
      await server.close();
      server.log.info('Server closed gracefully');
      process.exit(0);
    } catch (error) {
      server.log.error(error);
      process.exit(1);
    }
  });
});

start();