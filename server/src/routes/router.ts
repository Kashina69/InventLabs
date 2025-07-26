import { Router } from 'express';
import inventoryRoutes from './inventory.route.js';
import authRoutes from './auth.route.js';
import searchRoutes from './search.route.js';
import backupRoutes from './backup.route.js';
import analyticsRoutes from './analytics.route.js';
import alertsRoutes from './alerts.route.js';
import productRoutes from './product.route.js';

const router = Router();

router.use('/inventory', inventoryRoutes);
router.use('/auth', authRoutes);
router.use('/search', searchRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/backup', backupRoutes);
router.use('/alerts', alertsRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/products', productRoutes);

export default router;
