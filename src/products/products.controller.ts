import e, { Request, Response } from "express";
import { createProductService, getProductsService,getProductService } from "./products.servces";
import { createProductSchema } from "../validation/createProductSchema";

export const createProductController = async (req: Request, res: Response) => {
  const { name, price, amount } = req.body;
  const validPayload = createProductSchema.parse({ name, price, amount });
  const product = await createProductService(name, price, amount);
  res.status(201).json({ product, message: "product created succesfully" });
};

export const getProductsController = async (req: Request, res: Response) => {
  const products = await getProductsService();
  res.status(200).json(products);
}

export const getProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProductService(parseInt(id));
  res.status(200).json(product);
}