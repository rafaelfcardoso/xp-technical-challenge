import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import assetService from '../services/asset.service';
import investmentsService from '../services/investments.service';

interface InvestmentOrderBody {
  codCliente: number;
  codAtivo: number;
  qtdeAtivo: number;
}

const investmentRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /investimentos/comprar - Buy investment
  fastify.post('/comprar', async (request: FastifyRequest<{ Body: InvestmentOrderBody }>, reply: FastifyReply) => {
    const order = request.body;

    const brokerAsset = await assetService.getByCodeAsset(order.codAtivo);

    if (brokerAsset.qtdeAtivo < order.qtdeAtivo || !brokerAsset || brokerAsset === undefined) {
      return reply.code(StatusCodes.BAD_REQUEST).send({ 
        message: 'Quantidade indisponível na Corretora!' 
      });
    }

    const investment = await investmentsService.newBuyOrder(order);
    return reply.code(StatusCodes.CREATED).send(investment);
  });

  // POST /investimentos/vender - Sell investment
  fastify.post('/vender', async (request: FastifyRequest<{ Body: InvestmentOrderBody }>, reply: FastifyReply) => {
    const order = request.body;
    
    const investment = await investmentsService.newSellOrder(order);

    // Handle service-level validation errors
    if ('message' in investment) {
      fastify.log.info(investment.message);
      return reply.code(StatusCodes.BAD_REQUEST).send({ 
        message: investment.message 
      });
    }

    return reply.code(StatusCodes.CREATED).send(investment);
  });
};

export default investmentRoutes;