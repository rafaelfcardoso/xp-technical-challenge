import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import assetService from "../services/asset.service";

const assetController = Router();

assetController.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  const assetId = parseInt(req.params.id);

  const assets = await assetService.getByCodeAsset(assetId);

  return res.status(StatusCodes.OK).json(assets);
})

assetController.get("/cliente/:id", async (req: Request, res: Response): Promise<Response> => {
  const codeClient = parseInt(req.params.id);

  const assets = await assetService.getByClient(codeClient);

  return res.status(StatusCodes.OK).json(assets);
})

assetController.put("/comprar/:id", async (req: Request, res: Response): Promise<Response> => {
  const codAtivo = parseInt(req.params.id);
  const order = await assetService.updateBuyOrder(codAtivo, req.body);

  return res.status(StatusCodes.OK).json(order);
})

assetController.put("/vender/:id", async (req: Request, res: Response): Promise<Response> => {
  const codAtivo = parseInt(req.params.id);
  const order = await assetService.updateSellOrder(codAtivo, req.body);

  return res.status(StatusCodes.OK).json(order);
})

export default assetController;