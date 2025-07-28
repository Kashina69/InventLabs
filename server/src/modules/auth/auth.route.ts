import { Router } from 'express';
import * as controller from './auth.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', authenticate, controller.logout);

export default router;
