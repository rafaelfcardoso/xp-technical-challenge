import { FastifyPluginAsync, FastifyError } from 'fastify';
import fp from 'fastify-plugin';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../shared/http.exception';

const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler(async (error: FastifyError & HttpException, request, reply) => {
    fastify.log.error(error);

    // Handle custom HttpException
    if (error.status) {
      return reply
        .code(error.status)
        .send({ message: error.message || error._message });
    }

    // Handle Fastify validation errors
    if (error.validation) {
      return reply
        .code(StatusCodes.BAD_REQUEST)
        .send({ 
          message: 'Validation error',
          details: error.validation 
        });
    }

    // Handle JWT errors
    if (error.message?.includes('jwt') || error.message?.includes('token')) {
      return reply
        .code(StatusCodes.UNAUTHORIZED)
        .send({ message: 'Invalid or expired token' });
    }

    // Default server error
    return reply
      .code(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal Server Error' });
  });
};

export default fp(errorHandlerPlugin);