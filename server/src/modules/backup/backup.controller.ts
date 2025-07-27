import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import archiver from 'archiver';

const DB_PATH = path.join(path.resolve(), '../../../database.sql');
const BACKUP_DIR = path.join(path.resolve(), '../../../backups');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR);
}

// Trigger backup
export const triggerBackup = (req: Request, res: Response) => {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupName = `backup_${timestamp}.db`;
    const backupPath = path.join(BACKUP_DIR, backupName);

    fs.copyFileSync(DB_PATH, backupPath);

    res.status(200).json({
      message: 'Backup created successfully',
      filename: backupName,
    });
  } catch (err) {
    res.status(500).json({ error: 'Backup failed', details: err });
  }
};

// List all backups
export const listBackups = (req: Request, res: Response) => {
  try {
    const files = fs.readdirSync(BACKUP_DIR);
    const backupFiles = files
      .filter(f => f.endsWith('.db') || f.endsWith('.zip'))
      .map(filename => {
        const stat = fs.statSync(path.join(BACKUP_DIR, filename));
        return {
          filename,
          size: (stat.size / 1024).toFixed(2) + ' KB',
          createdAt: stat.birthtime,
        };
      });

    res.status(200).json(backupFiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list backups', details: err });
  }
};

// Download a backup
export const downloadBackup = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(BACKUP_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Backup not found' });
  }

  res.download(filePath);
};

// Zip and download
export const zipAndDownload = (req: Request, res: Response) => {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const zipName = `backup_${timestamp}.zip`;
    const zipPath = path.join(BACKUP_DIR, zipName);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      res.download(zipPath);
    });

    archive.on('error', err => {
      throw err;
    });

    archive.pipe(output);
    archive.file(DB_PATH, { name: 'database.sqlite' });
    archive.finalize();
  } catch (err) {
    res.status(500).json({ error: 'Failed to zip backup', details: err });
  }
};
