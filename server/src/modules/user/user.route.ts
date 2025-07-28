import { Router } from 'express';
import { updateProfile, getProfile } from './user.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

// Protected routes - require authentication
router.use(authenticate);

// Get user profile
router.get('/profile', getProfile);

// Update user profile
router.put('/profile', updateProfile);

export default router;
