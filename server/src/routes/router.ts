import { Router } from 'express';
import authRoutes from '../modules/auth/auth.route.js';
import staffRoutes from '../modules/staff/staff.route.js';
import productRoutes from '../modules/product/product.route.js';
import categoryRoutes from '../modules/category/category.route.js';
import backupRoutes from '../modules/backup/backup.route.js';
// import analyticsRoutes from './analytics.route.js';
// import alertsRoutes from './alerts.route.js';

import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/staff', staffRoutes);
router.use('/category', categoryRoutes);
router.use('/products', productRoutes);
// router.use('/analytics', analyticsRoutes);
// router.use('/backup', backupRoutes);
// router.use('/alerts', alertsRoutes);
router.use('/backup', authenticate, authorizeRoles('ADMIN'), backupRoutes);

export default router;
