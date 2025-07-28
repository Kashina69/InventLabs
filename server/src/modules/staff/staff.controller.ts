import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../user/User.model.js';
import getBusinessIdFromReq from '../../utils/getBusinessIdFromReq.utils.js';
import { decodeToken } from '../../utils/jwt.utils.js';
import { Op } from 'sequelize';

export const register = async (req: Request, res: Response) => {
  try {
    const businessId = getBusinessIdFromReq(req);
    if (!businessId) return res.status(401).json({ message: 'Unauthorized' });

    const token = (req as any).cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = decodeToken(token);
    if (decoded.role !== 'ADMIN') return res.status(403).json({ message: 'Admin access required' });

    const { name, email, passwordHash, phone } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(passwordHash, 10);

    const staff = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      phone,
      role: 'STAFF',
      businessId,
    });

    // Return staff without password hash
    const { passwordHash: _, ...staffWithoutPassword } = staff.toJSON();
    res.status(201).json(staffWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: 'Failed to register staff', error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const businessId = getBusinessIdFromReq(req);
    if (!businessId) return res.status(401).json({ message: 'Unauthorized' });

    const token = (req as any).cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = decodeToken(token);
    if (decoded.role !== 'ADMIN') return res.status(403).json({ message: 'Admin access required' });

    const { id, name, email, phone } = req.body;

    const staff = await User.findOne({
      where: { id, role: 'STAFF', businessId },
    });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    await staff.update({ name, email, phone });
    
    // Return staff without password hash
    const { passwordHash: _, ...staffWithoutPassword } = staff.toJSON();
    res.json(staffWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update staff', error: err });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const businessId = getBusinessIdFromReq(req);
    if (!businessId) return res.status(401).json({ message: 'Unauthorized' });

    const token = (req as any).cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = decodeToken(token);
    if (decoded.role !== 'ADMIN') return res.status(403).json({ message: 'Admin access required' });

    const { id } = req.body;

    const staff = await User.findOne({
      where: { id, role: 'STAFF', businessId },
    });
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    await staff.destroy();
    res.json({ message: 'Staff removed' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove staff', error: err });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    console.log("list list list list")
    const businessId = getBusinessIdFromReq(req);
    if (!businessId) return res.status(401).json({ message: 'Unauthorized' });

    const token = (req as any).cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = decodeToken(token);
    if (decoded.role !== 'ADMIN') return res.status(403).json({ message: 'Admin access required' });

    console.log(req.query)
    const { search } = req.query;
    
    const whereClause: any = { 
      role: 'STAFF', 
      businessId 
    };

    if (search && typeof search === 'string') {
      // Use Op.like instead of Op.iLike for SQLite compatibility (no ILIKE in SQLite)
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } }
      ];
    }
console.log("search",search)
    console.log(whereClause)

    const staffList = await User.findAll({
      where: whereClause,
      attributes: { exclude: ['passwordHash'] },
    });
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list staff', error: err });
  }
};
