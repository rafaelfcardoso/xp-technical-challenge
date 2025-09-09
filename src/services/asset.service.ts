import { AssetRepository } from "../repositories/AssetRepository";
import { IBrokerAsset } from "../interfaces/brokerAssets.interface";
import IClientAsset from "../interfaces/clientAssets.interface";
import IUpdateOrder from "../interfaces/updateOrder";
import HttpException from "../shared/http.exception";
import { StatusCodes } from 'http-status-codes';

const assetRepository = new AssetRepository();

const isValid = (order: IUpdateOrder) => {
  if (!order.qtdeAtivo || typeof order.qtdeAtivo !== "number") return false;
  if (!order.codCliente || typeof order.codCliente !== "number") return false;

  return true;
};

const getByCodeAsset = async (codAtivo: number): Promise<IBrokerAsset> => {
  const asset = await assetRepository.findBrokerAssetByCode(codAtivo);
  
  if (!asset) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Asset not found");
  }

  return {
    codAtivo: asset.codAtivo,
    qtdeAtivo: asset.qtdeAtivo,
    valor: asset.valor
  };
};

const getByClient = async (codCliente: number): Promise<IClientAsset[]> => {
  const assets = await assetRepository.findClientAssets(codCliente);
  return assets.map(asset => ({
    codCliente: asset.codCliente,
    codAtivo: asset.codAtivo,
    qtdeAtivo: asset.qtdeAtivo,
    valor: asset.valor
  }));
};

const updateBuyOrder = async (codAtivo: number, order: IUpdateOrder): Promise<IUpdateOrder> => {
  if (!isValid(order)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos.");
  }

  const valueResult = await assetRepository.getBrokerAssetValue(codAtivo);
  if (!valueResult) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Asset not found");
  }
  
  const { valor } = valueResult;
  const clientAsset = { ...order, codAtivo, valor };

  const clientHistory = await assetRepository.findClientAssets(order.codCliente);

  if (clientHistory.length) {
    const hasAsset = clientHistory.some(asset => asset.codAtivo === codAtivo);
    
    if (hasAsset) {
      await assetRepository.updateClientAssetQuantity(order.codCliente, codAtivo, order.qtdeAtivo);
    } else {
      throw new HttpException(StatusCodes.BAD_REQUEST, "Não existem ordens cadastradas neste ativo.");
    }
  } else {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Não existem ordens cadastradas neste ativo."); 
  }

  return clientAsset;
};

const updateSellOrder = async (codAtivo: number, order: IUpdateOrder): Promise<IUpdateOrder> => {
  if (!isValid(order)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos.");
  }

  const valueResult = await assetRepository.getBrokerAssetValue(codAtivo);
  if (!valueResult) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Asset not found");
  }
  
  const { valor } = valueResult;
  const orderWithValue = { ...order, codAtivo, valor };

  const clientAsset = await assetRepository.findClientAsset(order.codCliente, codAtivo);
  
  if (!clientAsset) {
    return { ...order, message: `Ativo ${codAtivo} não encontrado para o cliente ${order.codCliente}.` };
  }

  if (clientAsset.qtdeAtivo <= order.qtdeAtivo) {
    return { ...order, message: "Valor da venda é maior que a quantia sob custódia." };
  }

  await assetRepository.decrementClientAssetQuantity(order.codCliente, codAtivo, order.qtdeAtivo);
  return order;
};

export default {
  getByCodeAsset,
  getByClient,
  updateBuyOrder,
  updateSellOrder
};

