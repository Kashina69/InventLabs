import { Router } from 'express';
import { authenticate, authorizeRoles } from '../../middlewares/auth.middleware.js';
import * as controller from './admin.controller.js';

const router = Router();

router.put('/update', authenticate, authorizeRoles('ADMIN'), controller.update);

export default router;
