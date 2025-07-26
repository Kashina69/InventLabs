import { Request, Response } from 'express';
import User from '../models/User.model.js';

export const updatePreferences = async (req: Request, res: Response) => {
  const { lowStock } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const prefs = { ...user.notificationPreferences, lowStock };
  await user.update({ notificationPreferences: prefs });
  res.json({ message: 'Preferences updated', notificationPreferences: prefs });
};
