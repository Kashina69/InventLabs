import { Router } from 'express';
import { searchProducts } from '../controllers/search.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * GET /api/products/search
 * Query Params:
 *   - query: string (search term)
 *   - page: number (1+), default 1
 *   - limit: number (1–100), default 20
 */
router.get('/products/', authenticate, searchProducts);

export default router;
