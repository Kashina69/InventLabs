import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { exportLocalBackup } from '../controllers/backup.controller.js';
import { manualSync } from '../controllers/search.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/export/local-backup?format=json|csv
router.get('/export/local-backup', authenticate, authorizeRoles('ADMIN'), exportLocalBackup);

// Validation for sync payload
const validateSync = [
  body('products').optional().isArray(),
  body('logs').optional().isArray(),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
    next();
  },
];

// POST /api/sync/manual
router.post('/sync/manual', authenticate, authorizeRoles('ADMIN'), validateSync, manualSync);

export default router;
