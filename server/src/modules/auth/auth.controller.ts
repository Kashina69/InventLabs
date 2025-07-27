import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../user/User.model.js';
import Business from '../business/Business.model.js';
import { signToken } from '../../utils/jwt.utils.js';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone, business_name } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(409).json({ message: 'Email already registered' });
  const passwordHash = await bcrypt.hash(password, 10);
  const { id: businessId } = await Business.create({ name: business_name });
  const user = await User.create({ name, email, passwordHash, role: 'ADMIN', phone, businessId });
  const token = signToken({ id: user.id, email: user.email, name: user.name, role: 'ADMIN', businessId: user.businessId, });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  res.status(201).json({ message: 'Registered successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    businessId: user.businessId,
  });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Login successful' });
};

export const me = async (req: any, res: Response) => {
  const user = await User.findByPk(req.user.id, { attributes: { exclude: ['passwordHash'] } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
