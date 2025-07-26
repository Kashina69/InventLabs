import { Request, Response } from 'express';
import { Parser } from 'json2csv';
import Product from '../models/product.model.js';
import InventoryLog from '../models/InventoryLog.model.js';

export const exportLocalBackup = async (req: Request, res: Response) => {
  const format = (req.query.format as string)?.toLowerCase() || 'json';
  const products = await Product.findAll();
  const logs = await InventoryLog.findAll({ order: [['timestamp', 'ASC']] });

  if (format === 'csv') {
    // Convert each array to CSV
    const prodCsv = new Parser().parse(products.map(p => p.toJSON()));
    const logCsv = new Parser().parse(logs.map(l => l.toJSON()));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="backup.csv"');
    // Separate sections by blank line
    return res.send(`${prodCsv}\n\n${logCsv}`);
  }

  // Default JSON
  res.setHeader('Content-Disposition', 'attachment; filename="backup.json"');
  res.json({ products, logs });
};
