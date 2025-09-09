import { FastifyPluginAsync } from 'fastify';
import 'dotenv/config';

// Import plugins
import typeormPlugin from './plugins/typeorm.plugin';
import jwtPlugin from './plugins/jwt.plugin';
import errorHandlerPlugin from './plugins/error-handler.plugin';

// Import route plugins
import accountRoutes from './routes/account.routes';
import assetRoutes from './routes/asset.routes';
import investmentRoutes from './routes/investments.routes';
import loginRoutes from './routes/login.routes';

const app: FastifyPluginAsync = async (fastify) => {
  // Register database connection first
  await fastify.register(typeormPlugin);
  
  // Register core plugins
  await fastify.register(jwtPlugin);
  await fastify.register(errorHandlerPlugin);

  // Register route plugins with prefixes
  await fastify.register(accountRoutes, { prefix: '/conta' });
  await fastify.register(assetRoutes, { prefix: '/ativos' });
  await fastify.register(investmentRoutes, { prefix: '/investimentos' });
  await fastify.register(loginRoutes, { prefix: '/login' });
};

export default app;