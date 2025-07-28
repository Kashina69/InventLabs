import { Router } from 'express';
import * as controller from './business.controller.js';
import { authenticate, authorizeRoles, isAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

router.put('/update', authenticate, isAdmin, controller.update);

export default router;
