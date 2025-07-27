import jwt from 'jsonwebtoken';
import { UserPayload } from '../../../types/user.js';

export const signToken = (payload: UserPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): UserPayload => {
  return jwt.verify(token, process.env.JWT_SECRET) as UserPayload;
};

export const decodeToken = (token: string): UserPayload => {
  return jwt.decode(token) as UserPayload;
};
