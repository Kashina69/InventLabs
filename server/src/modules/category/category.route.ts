import { Router } from 'express';
import * as controller from './category.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.put('/add', authenticate, controller.add);
router.patch('/edit:id', authenticate, controller.edit);
router.delete('/remove:id', authenticate, controller.remove);
router.get('/list', authenticate, controller.list);

export default router;
