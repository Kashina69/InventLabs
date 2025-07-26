import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';
import { updatePreferences } from '../controllers/user.controller.js';

const router = Router();

// (We trigger automatically in updateStock—no manual trigger needed)
// But if you want a manual trigger endpoint:
router.post('/trigger', authenticate, authorizeRoles('ADMIN'), async (req, res) => {
  // e.g. call sendLowStockAlert for a specific product
  res.json({ message: 'Manual trigger endpoint (optional)' });
});

// User prefs
router.put(
  '/users/:id/preferences',
  authenticate,
  authorizeRoles('ADMIN'),
  async (req, res, next) => {
    // reuse controller
    try {
      await updatePreferences(req, res);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
