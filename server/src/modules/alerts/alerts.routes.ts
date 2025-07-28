import { Router } from 'express';
import * as controller from './alerts.controller.js';

const router = Router();

// GET /alerts/stock - Get stock alerts (out of stock and low stock products)
router.get('/stock', controller.getStockAlerts);

export default router;
