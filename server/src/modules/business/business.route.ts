import { Router } from 'express';
import * as controller from './business.controller.js';
import { authenticate, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

router.put('/update', authenticate, authorizeRoles('ADMIN'), controller.update);

export default router;
