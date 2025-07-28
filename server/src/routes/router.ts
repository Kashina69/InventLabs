import { Router } from 'express';
import authRoutes from '../modules/auth/auth.route.js';
import staffRoutes from '../modules/staff/staff.route.js';
import productRoutes from '../modules/product/product.route.js';
import categoryRoutes from '../modules/category/category.route.js';
import backupRoutes from '../modules/backup/backup.route.js';
import inventoryLogsRoutes from '../modules/inventoryLogs/inventoryLogs.route.js';
import userRoutes from '../modules/user/user.route.js';
import analyticsRoutes from '../modules/analytics/analytics.route.js';
import dashboardRoutes from "../modules/dashboard/dashboard.route.js"
import alertsRoutes from '../modules/alerts/alerts.routes.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/staff', staffRoutes);
router.use('/category', categoryRoutes);
router.use('/products', productRoutes);
router.use('/inventory-logs', authenticate, inventoryLogsRoutes);
router.use('/user', userRoutes);
router.use('/analytics', authenticate, analyticsRoutes);
// router.use('/backup', backupRoutes);
router.use('/backup', authenticate, authorizeRoles('ADMIN'), backupRoutes);
router.use('/dashboard', authenticate, dashboardRoutes)
router.use('/alerts', authenticate, alertsRoutes);

export default router;
