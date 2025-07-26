import { Router } from 'express';
import * as controller from './category.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.put('/add', authenticate, controller.add);
router.patch('/edit', authenticate, controller.edit);
router.delete('/remove', authenticate, controller.remove);
router.get('/list', authenticate, controller.list);

export default router;
