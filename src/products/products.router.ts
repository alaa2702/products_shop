import Express from "express";
import { createProductController, getProductsController } from "./products.controller";
import { authenticateToken } from "../utils/authenticateToken";
import { authorizeRole } from "../utils/authorizationRole";

export const productRouter = Express.Router();
productRouter.post("/products/create",authenticateToken, authorizeRole("ADMIN"), createProductController);

productRouter.get("/products",authenticateToken, getProductsController);