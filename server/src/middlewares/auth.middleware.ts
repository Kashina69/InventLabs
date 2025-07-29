import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../../../types/user.js';
import { decodeToken } from '../utils/jwt.utils.js';
import User from '../modules/user/User.model.js';

interface JwtPayload {
  id: number;
  role: UserRole;
}

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {console.log("401 comming"); return res.status(401).json({ message: 'Unauthorized: No token' })};

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id, businessId } = decodeToken(req.cookies.token);
  const user = await User.findOne({
    where: { id, businessId, role: 'ADMIN' },
  });
  if (user) {
    return next();
  }
  console.log("401 comming isAdmin"); 
  return res.status(403).json({ message: 'Not authorized' });
};

export const isStaff = async (req: Request, res: Response, next: NextFunction) => {
  const { id, businessId } = decodeToken(req.cookies.token);
  const user = await User.findOne({
    where: { id, businessId, role: 'STAFF' },
  });
  if (user) {
    return next();
  }
  return res.status(403).json({ message: 'Not authorized' });
};
