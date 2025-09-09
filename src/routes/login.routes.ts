import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import clientService from '../services/client.service';
import { generateJWTToken } from '../utils/jwt';

interface LoginBody {
  username: string;
  password: string;
}

const loginRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /login - User authentication
  fastify.post('/', async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
    const { username, password } = request.body;

    // Validate required fields
    if (!username || !password) {
      return reply.code(StatusCodes.BAD_REQUEST).send({
        message: '"username" and "password" are required'
      });
    }

    const [user] = await clientService.getByUsername(username);

    if (!user || user.password !== password) {
      return reply.code(StatusCodes.UNAUTHORIZED).send({
        message: 'Username or password invalid'
      });
    }

    const token = generateJWTToken({ 
      codCliente: user.codCliente, 
      username: user.username 
    });
    
    return reply.code(StatusCodes.CREATED).send({ token });
  });
};

export default loginRoutes;