import { Router } from 'express';
import {
  getStockSummary,
  getLowStock,
  getActivity,
  exportProductsExcel,
  exportLogsPDF,
} from '../controllers/analytics.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// Analytics (all roles can view)
router.get('/stock-summary', authenticate, getStockSummary);
router.get('/low-stock', authenticate, getLowStock);
router.get('/activity', authenticate, getActivity);

// Exports (admins only)
router.get('/export/products/excel', authenticate, authorizeRoles('ADMIN'), exportProductsExcel);
router.get('/export/logs/pdf', authenticate, authorizeRoles('ADMIN'), exportLogsPDF);

export default router;
