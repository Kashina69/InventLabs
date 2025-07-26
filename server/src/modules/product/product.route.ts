import { Router } from 'express';
import * as controller from './prodcut.controller.js';
import { productValidationRules, validateId } from '../../middlewares/validateProduct.js';
import { authenticate, authorizeRoles } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/list', authenticate, controller.getAllProducts);
router.get('/:id', authenticate, validateId, controller.getProductById);
router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  productValidationRules,
  controller.createProduct
);
router.put(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateId,
  productValidationRules,
  controller.updateProduct
);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateId, controller.deleteProduct);

export default router;
