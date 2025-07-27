import { Request, Response } from 'express';
import User from '../user/User.model.js';

export const update = async (req: Request, res: Response) => {
  try {
    const admin = req.user as User;
    const { name, email, phone } = req.body;

    if (admin.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await admin.update({ name, email, phone });
    res.json({ message: 'Admin updated', admin });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update admin', error: err });
  }
};
