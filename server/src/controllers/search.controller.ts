import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/product.model.js';
import type { SyncPayload } from '../../../types/sync.ts';
import InventoryLog from '../models/InventoryLog.model.js';

export const searchProducts = async (req: Request, res: Response) => {
  const {
    query = '',
    page = '1',
    limit = '20',
  } = req.query as {
    query?: string;
    page?: string;
    limit?: string;
  };

  const pageNum = Math.max(parseInt(page, 10), 1);
  const pageSize = Math.min(Math.max(parseInt(limit, 10), 1), 100);
  const offset = (pageNum - 1) * pageSize;

  const whereClause = query
    ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { barcode: { [Op.iLike]: `%${query}%` } },
          { category: { [Op.iLike]: `%${query}%` } },
        ],
      }
    : {};

  const { rows, count } = await Product.findAndCountAll({
    where: whereClause,
    offset,
    limit: pageSize,
    order: [['name', 'ASC']],
  });

  res.json({
    meta: {
      total: count,
      page: pageNum,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    },
    data: rows,
  });
};

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
