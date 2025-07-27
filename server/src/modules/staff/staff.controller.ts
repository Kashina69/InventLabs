import { Request, Response } from 'express';
import User from '../user/User.model.js';

export const register = async (req: Request, res: Response) => {
  // try {
  //   const admin = req. as User;
  //   const { name, email, passwordHash, phone } = req.body;

  //   // Check if email already exists
  //   const existing = await User.findOne({ where: { email } });
  //   if (existing) return res.status(409).json({ message: 'Email already exists' });

  //   const staff = await User.create({
  //     name,
  //     email,
  //     passwordHash,
  //     phone,
  //     role: 'STAFF',
  //     businessId: admin.businessId,
  //   });

  //   res.status(201).json(staff);
  // } catch (err) {
  //   res.status(500).json({ message: 'Failed to register staff', error: err });
  // }
};

export const update = async (req: Request, res: Response) => {
  // try {
  //   const admin = req.user as User;
  //   const { id, name, email, phone } = req.body;

  //   const staff = await User.findOne({
  //     where: { id, role: 'STAFF', businessId: admin.businessId },
  //   });
  //   if (!staff) return res.status(404).json({ message: 'Staff not found' });

  //   await staff.update({ name, email, phone });
  //   res.json(staff);
  // } catch (err) {
  //   res.status(500).json({ message: 'Failed to update staff', error: err });
  // }
};

export const remove = async (req: Request, res: Response) => {
  // try {
  //   const admin = req.user as User;
  //   const { id } = req.body;

  //   const staff = await User.findOne({
  //     where: { id, role: 'STAFF', businessId: admin.businessId },
  //   });
  //   if (!staff) return res.status(404).json({ message: 'Staff not found' });

  //   await staff.destroy();
  //   res.json({ message: 'Staff removed' });
  // } catch (err) {
  //   res.status(500).json({ message: 'Failed to remove staff', error: err });
  // }
};

export const list = async (req: Request, res: Response) => {
  // try {
  //   const admin = req.user as User;
  //   const staffList = await User.findAll({
  //     where: { role: 'STAFF', businessId: admin.businessId },
  //     attributes: { exclude: ['passwordHash'] },
  //   });
  //   res.json(staffList);
  // } catch (err) {
  //   res.status(500).json({ message: 'Failed to list staff', error: err });
  // }
};
