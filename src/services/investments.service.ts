import { StatusCodes } from "http-status-codes";
import { InvestmentRepository } from "../repositories/InvestmentRepository";
import { AssetRepository } from "../repositories/AssetRepository";
import IOrderBody from "../interfaces/order.interface";
import HttpException from "../shared/http.exception";

const investmentRepository = new InvestmentRepository();
const assetRepository = new AssetRepository();

const isValid = (order: IOrderBody) => {
  if (!order.codCliente || typeof order.codCliente !== "number") return false;
  if (!order.codAtivo || typeof order.codAtivo !== "number") return false;
  if (!order.qtdeAtivo || typeof order.qtdeAtivo !== "number") return false;

  return true;
};

const newBuyOrder = async (order: IOrderBody): Promise<IOrderBody> => {
  if (!isValid(order)) {
    throw new HttpException(400, "Dados inválidos!");
  }

  // Create buy order record
  const createdOrder = await investmentRepository.createBuyOrder({
    codCliente: order.codCliente,
    codAtivo: order.codAtivo,
    qtdeAtivo: order.qtdeAtivo
  });

  const buyOrder = { ...order, id: createdOrder.id || 0 };

  // Get asset value
  const valueResult = await assetRepository.getBrokerAssetValue(order.codAtivo);
  if (!valueResult) {
    throw new HttpException(StatusCodes.NOT_FOUND, "Asset not found");
  }
  
  const { valor } = valueResult;
  const clientAsset = { ...order, valor };

  // Check if client already has this asset
  const existingAsset = await assetRepository.findClientAsset(order.codCliente, order.codAtivo);

  if (!existingAsset) {
    // Create new client asset entry
    await assetRepository.createClientAsset({
      codCliente: order.codCliente,
      codAtivo: order.codAtivo,
      qtdeAtivo: order.qtdeAtivo,
      valor: valor
    });
  } else {
    // Update existing client asset quantity
    await assetRepository.updateClientAssetQuantity(order.codCliente, order.codAtivo, order.qtdeAtivo);
  }

  return buyOrder;
};

const newSellOrder = async (order: IOrderBody): Promise<IOrderBody> => {
  if (!isValid(order)) {
    throw new HttpException(StatusCodes.BAD_REQUEST, "Dados inválidos.");
  }

  // Check if client owns the asset
  const clientAsset = await assetRepository.findClientAsset(order.codCliente, order.codAtivo);
  
  if (!clientAsset) {
    return { ...order, message: `Ativo ${order.codAtivo} não encontrado para o cliente ${order.codCliente}.` };
  }

  if (clientAsset.qtdeAtivo <= order.qtdeAtivo) {
    return { ...order, message: "Valor da venda é maior que a quantia sob custódia." };
  }

  // Update client asset quantity (decrease)
  await assetRepository.decrementClientAssetQuantity(order.codCliente, order.codAtivo, order.qtdeAtivo);

  // Create sell order record
  const createdSellOrder = await investmentRepository.createSellOrder({
    codCliente: order.codCliente,
    codAtivo: order.codAtivo,
    qtdeAtivo: order.qtdeAtivo
  });

  return { ...order, id: createdSellOrder.id };
};

export default {
  newBuyOrder,
  newSellOrder,
};