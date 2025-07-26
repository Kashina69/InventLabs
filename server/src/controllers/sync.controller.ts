import { Request, Response } from 'express';
import type { SyncPayload } from '../../../types/sync.ts';
import Product from '../models/product.model.js';
import InventoryLog from '../models/InventoryLog.model.js';

export const manualSync = async (req: Request, res: Response) => {
  const { products = [], logs = [] } = req.body as SyncPayload;

  // Upsert products
  for (const p of products) {
    // expiryDate might be null or string
    await Product.upsert({
      ...p,
      expiryDate: p.expiryDate ? new Date(p.expiryDate) : null,
    });
  }

  // Bulk insert logs, ignore duplicates by primary key
  if (logs.length) {
    await InventoryLog.bulkCreate(
      logs.map(l => ({
        id: l.id,
        productId: l.productId,
        type: l.type,
        quantity: l.quantity,
        userId: l.userId,
        timestamp: new Date(l.timestamp),
      })),
      { ignoreDuplicates: true }
    );
  }

  res.json({ message: 'Sync completed', synced: { products: products.length, logs: logs.length } });
};
