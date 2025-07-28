import { Router } from 'express';
import { getStockAlerts } from './alerts.controller.js';

const router = Router();

// GET /alerts/stock - Get stock alerts (out of stock and low stock products)
router.get('/stock', getStockAlerts);

export default router;
