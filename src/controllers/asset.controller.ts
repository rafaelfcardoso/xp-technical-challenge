import { Request, Response, Router } from "express";
import assetService from "../services/asset.service";

const assetController = Router();

assetController.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  const assetId = parseInt(req.params.id);

  const assets = await assetService.getByCodeAsset(assetId);

  return res.status(200).json(assets);
})

assetController.get("/cliente/:id", async (req: Request, res: Response): Promise<Response> => {
  const codeClient = parseInt(req.params.id);

  const assets = await assetService.getByClient(codeClient);

  return res.status(200).json(assets);
})

export default assetController;