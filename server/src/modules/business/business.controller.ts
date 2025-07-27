import { Request, Response } from 'express';
import Business from './Business.model.js';

export const update = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;
    const business = await Business.findByPk(id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    await business.update({ name });
    res.json({ message: 'Business updated', business });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update business', error: err });
  }
};
