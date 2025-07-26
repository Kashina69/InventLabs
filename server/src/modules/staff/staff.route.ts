import { Router } from 'express';
import * as controller from './staff.controller.js';
import { authenticate, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

router.put('/register', authenticate, authorizeRoles('ADMIN'), controller.register);
router.patch('/update', authenticate, authorizeRoles('ADMIN'), controller.update);
router.delete('/remove', authenticate, authorizeRoles('ADMIN'), controller.remove);
router.get('/list', authenticate, authorizeRoles('ADMIN'), controller.list);

export default router;
