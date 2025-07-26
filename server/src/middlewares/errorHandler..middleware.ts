import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger.config.js';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message);
  res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
}
