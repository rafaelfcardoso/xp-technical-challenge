import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import clientService from '../services/client.service';
import accountService from '../services/account.service';

interface ClientParams {
  id: string;
}

interface TransactionBody {
  codCliente: number;
  valor: number;
}

const accountRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /conta/:id - Get client account balance
  fastify.get('/:id', async (request: FastifyRequest<{ Params: ClientParams }>, reply: FastifyReply) => {
    const codeClient = parseInt(request.params.id);
    const client = await clientService.getByCodeClient(codeClient);
    return reply.code(StatusCodes.OK).send(client);
  });

  // POST /conta/deposito - Create deposit
  fastify.post('/deposito', async (request: FastifyRequest<{ Body: TransactionBody }>, reply: FastifyReply) => {
    const transaction = await accountService.createDeposit(request.body);
    return reply.code(StatusCodes.CREATED).send(transaction);
  });

  // POST /conta/saque - Create withdrawal
  fastify.post('/saque', async (request: FastifyRequest<{ Body: TransactionBody }>, reply: FastifyReply) => {
    const transaction = await accountService.createWithdraw(request.body);
    return reply.code(StatusCodes.CREATED).send(transaction);
  });
};

export default accountRoutes;