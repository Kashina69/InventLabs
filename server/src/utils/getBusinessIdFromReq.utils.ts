import { Request } from 'express';
import { decodeToken } from './jwt.utils.js';

const getBusinessIdFromReq = (req: Request): number | null => {
  const token = (req as any).cookies?.token;
  if (!token) return null;
  try {
    const decoded: any = decodeToken(token);
    return decoded.businessId;
  } catch {
    return null;
  }
};

export default getBusinessIdFromReq;