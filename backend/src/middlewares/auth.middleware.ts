import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

// Extender la interfaz Request para incluir `user`
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Acceso denegado. Token requerido.' });

  try {
    const verified = jwt.verify(token, config.jwtSecret);
    req.user = verified; // ahora TypeScript no se quejará
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
}

export default authMiddleware;
