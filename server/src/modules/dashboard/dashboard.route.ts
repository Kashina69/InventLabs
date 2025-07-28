import { Router } from 'express';
import * as controller from './dashboard.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authenticate, controller.dashboard)
router.get('/counts', authenticate, controller.counts)

export default router;
