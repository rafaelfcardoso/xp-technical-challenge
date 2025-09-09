import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import assetService from '../services/asset.service';

interface AssetParams {
  id: string;
}

interface AssetUpdateBody {
  qtdeAtivo: number;
}

const assetRoutes: FastifyPluginAsync = async (fastify) => {
  // GET /ativos/:id - Get asset by id
  fastify.get('/:id', async (request: FastifyRequest<{ Params: AssetParams }>, reply: FastifyReply) => {
    const assetId = parseInt(request.params.id);
    const asset = await assetService.getByCodeAsset(assetId);
    return reply.code(StatusCodes.OK).send(asset);
  });

  // GET /ativos/cliente/:id - Get client assets
  fastify.get('/cliente/:id', async (request: FastifyRequest<{ Params: AssetParams }>, reply: FastifyReply) => {
    const codeClient = parseInt(request.params.id);
    const assets = await assetService.getByClient(codeClient);
    return reply.code(StatusCodes.OK).send(assets);
  });

  // PUT /ativos/comprar/:id - Buy asset
  fastify.put('/comprar/:id', async (request: FastifyRequest<{ Params: AssetParams; Body: AssetUpdateBody }>, reply: FastifyReply) => {
    const codAtivo = parseInt(request.params.id);
    const order = await assetService.updateBuyOrder(codAtivo, request.body);
    return reply.code(StatusCodes.OK).send(order);
  });

  // PUT /ativos/vender/:id - Sell asset
  fastify.put('/vender/:id', async (request: FastifyRequest<{ Params: AssetParams; Body: AssetUpdateBody }>, reply: FastifyReply) => {
    const codAtivo = parseInt(request.params.id);
    const order = await assetService.updateSellOrder(codAtivo, request.body);
    return reply.code(StatusCodes.OK).send(order);
  });
};

export default assetRoutes;