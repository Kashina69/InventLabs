import { body, param } from 'express-validator';

export const productValidationRules = [
  body('sku').isString().notEmpty().withMessage('SKU is required'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be 0 or more'),
  body('threshold').optional().isInt({ min: 0 }),
  body('expiryDate')
    .optional()
    .isISO8601()
    .toDate()
    .custom(value => {
      if (value && new Date(value) < new Date()) {
        throw new Error('Expiry date must be in the future');
      }
      return true;
    }),
];

export const validateId = [param('id').isInt().withMessage('Invalid product ID')];
