import { Request, Response } from 'express';
import User from './User.model.js';
import bcrypt from 'bcryptjs';
import { decodeToken } from '../../utils/jwt.utils.js';

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const decoded = decodeToken(req.cookies?.token);
    const userId = decoded?.id;
    console.log(req.body, "req.body")

    const { name, email, phone, password, currentPassword } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(409).json({ message: 'Email already exists' });
    }

    // Handle password change if provided
    let passwordHash;
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to change password' });
      }
      const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      passwordHash = await bcrypt.hash(password, 10);
    }

    await user.update({
      name: name ?? user.name,
      email: email ?? user.email,
      phone: phone ?? user.phone,
      ...(passwordHash && { passwordHash }),
    });

    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ['passwordHash'] },
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const decoded = decodeToken(req.cookies?.token);
    const userId = decoded?.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['passwordHash'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
