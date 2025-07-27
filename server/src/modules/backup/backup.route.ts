import express from 'express';
import {
  triggerBackup,
  listBackups,
  downloadBackup,
  zipAndDownload,
} from './backup.controller.js';

const router = express.Router();

// Ensure this is protected by admin middleware in main routes
router.post('/start', triggerBackup);
router.get('/list', listBackups);
router.get('/download/:filename', downloadBackup);
router.get('/zip-download', zipAndDownload);

export default router;
