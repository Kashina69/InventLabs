import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import * as controller from '../controllers/inventory.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

import { updateStock, getLogs } from '../controllers/inventory.controller.js';

const router = Router();

// Validation middleware
const validateStockUpdate = [
  body('productId').isInt().withMessage('Product ID required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be ≥ 1'),
  body('type').isIn(['ADD', 'REMOVE', 'RETURN', 'SALE']).withMessage('Invalid action type'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// POST /api/inventory/update-stock
router.post(
  '/update-stock',
  authenticate,
  authorizeRoles('ADMIN'),
  validateStockUpdate,
  updateStock
);

// GET /api/inventory/logs
router.get('/logs', authenticate, getLogs);

export default router;
