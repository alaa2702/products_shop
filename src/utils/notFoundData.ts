import { Request, Response, NextFunction } from "express";

export const notFoundData = (req: Request, res:Response, next:NextFunction) => {
    
    res.status(404).json({ message: "Resource not found" });
    next();
  };
