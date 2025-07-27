import { Router } from 'express';
import * as controller from './prodcut.controller.js';
import { authenticate, authorizeRoles, isAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/list', authenticate, controller.getAllProducts);
router.get('/get', authenticate, controller.getProductById);
router.post(
  '/add',
  authenticate,
  isAdmin,
  controller.createProduct
);
router.put(
  '/update',
  authenticate,
  isAdmin,
  controller.updateProduct
);
router.delete('/delete', authenticate, isAdmin, controller.deleteProduct);

export default router;
