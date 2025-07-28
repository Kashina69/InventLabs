import { Router } from 'express';
import { addInventoryLog, getInventoryLogs } from './inventroyLogs.controller.js';

const router = Router();

// Add inventory log
router.post('/add', addInventoryLog);

// Get inventory logs with pagination
router.get('/logs', getInventoryLogs);

export default router;
