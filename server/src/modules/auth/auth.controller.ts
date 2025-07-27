import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../modules/user/User.model.js';
import { signToken } from '../../utils/jwt.utils.js';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(409).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, passwordHash, role });

  const token = signToken({ id: user.id, email: user.email, name: user.name, role: user.role });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  res.status(201).json({ message: 'Registered successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ id: user.id, email: user.email, name: user.name, role: user.role });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Login successful' });
};

export const me = async (req: any, res: Response) => {
  res.json({ user: req.user });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
