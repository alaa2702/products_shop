import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;
      if (!user || !role.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };