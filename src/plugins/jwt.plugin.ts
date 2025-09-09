import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { JwtPayload } from 'jsonwebtoken';
import { authenticateToken } from '../utils/jwt';
import HttpException from '../shared/http.exception';
import { StatusCodes } from 'http-status-codes';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
  }
  interface FastifyRequest {
    user?: string | JwtPayload;
  }
}

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  // Add authentication decorator
  fastify.decorate('authenticate', async (request: FastifyRequest) => {
    try {
      const token = request.headers.authorization;
      
      if (!token) {
        throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token not found');
      }

      const user = await authenticateToken(token);
      request.user = user;
    } catch (error) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid token');
    }
  });

  // Add preHandler hook for authentication
  fastify.addHook('preHandler', async (request) => {
    // Skip authentication for login and health check routes
    if (request.url === '/login' || request.url === '/') {
      return;
    }
    
    // Apply authentication to protected routes
    const protectedRoutes = ['/conta', '/ativos', '/investimentos'];
    const isProtectedRoute = protectedRoutes.some(route => request.url.startsWith(route));
    
    if (isProtectedRoute) {
      await fastify.authenticate(request);
    }
  });
};

export default fp(jwtPlugin);