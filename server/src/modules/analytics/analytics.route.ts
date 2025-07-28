import { Router } from 'express';
import { getDistribution, getThresholdAnalysis } from './analytics.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

// GET /analytics/distribution
// Query parameters:
// - filter: 'category' | 'product' (default: 'product')
// - categoryId: number (optional)
router.get('/distribution', authenticate, getDistribution);

// GET /analytics/threshold-analysis
// Query parameters:
// - filter: 'category' | 'product' (default: 'product')
// - categoryId: number (optional)
router.get('/threshold', authenticate, getThresholdAnalysis);

export default router;
