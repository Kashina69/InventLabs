import { Router } from 'express';
import * as controller from './staff.controller.js';
import { authenticate, isAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

router.put('/register', authenticate, isAdmin, controller.register);
router.patch('/update', authenticate, isAdmin, controller.update);
router.delete('/remove', authenticate, isAdmin, controller.remove);
router.get('/list', authenticate, isAdmin, controller.list);

export default router;
