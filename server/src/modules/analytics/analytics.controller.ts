import { Request, Response } from 'express';
import { Op, fn, col } from 'sequelize';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import Product from '../product/Product.model.js';
import InventoryLog from '../inventoryLogs/InventoryLog.model.js';
// 1. Category‑wise stock summary
export const getStockSummary = async (_: Request, res: Response) => {
  const rows = await Product.findAll({
    attributes: ['category', [fn('SUM', col('stock')), 'totalStock']],
    group: ['category'],
  });

  const data = (rows as any[]).map(r => ({
    category: r.get('category'),
    totalStock: Number(r.get('totalStock')),
  }));
  res.json(data);
};

// 2. Low‑stock products
export const getLowStock = async (_: Request, res: Response) => {
  const items = await Product.findAll({
    where: { stock: { [Op.lte]: col('threshold') } },
    order: [['stock', 'ASC']],
  });
  res.json(items);
};

// 3. Activity aggregation: logs per day
export const getActivity = async (_: Request, res: Response) => {
  const rows = await InventoryLog.findAll({
    attributes: [
      [fn('DATE', col('timestamp')), 'date'],
      [fn('COUNT', col('id')), 'count'],
    ],
    group: [fn('DATE', col('timestamp'))],
    order: [[col('date'), 'ASC']],
  });

  const data = (rows as any[]).map(r => ({
    date: r.get('date'),
    count: Number(r.get('count')),
  }));
  res.json(data);
};

// 4. Export products as Excel
export const exportProductsExcel = async (_: Request, res: Response) => {
  const products = await Product.findAll();
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Products');

  sheet.columns = [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'SKU', key: 'sku', width: 20 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Category', key: 'category', width: 20 },
    { header: 'Stock', key: 'stock', width: 10 },
    { header: 'Threshold', key: 'threshold', width: 10 },
    { header: 'ExpiryDate', key: 'expiryDate', width: 15 },
  ];

  products.forEach((p: any) => {
    sheet.addRow({
      id: p.id,
      sku: p.sku,
      name: p.name,
      category: p.category,
      stock: p.stock,
      threshold: p.threshold,
      expiryDate: p.expiryDate?.toISOString().split('T')[0] ?? '',
    });
  });

  res.setHeader('Content-Disposition', 'attachment; filename="products.xlsx"');
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  await workbook.xlsx.write(res);
  res.end();
};

// 5. Export logs as PDF
export const exportLogsPDF = async (_: Request, res: Response) => {
  const logs = await InventoryLog.findAll({ order: [['timestamp', 'ASC']] });
  const doc = new PDFDocument({ margin: 30, size: 'A4' });

  res.setHeader('Content-Disposition', 'attachment; filename="logs.pdf"');
  res.setHeader('Content-Type', 'application/pdf');

  doc.pipe(res);

  doc.fontSize(18).text('Inventory Logs Report', { align: 'center' });
  doc.moveDown();

  // Table header
  doc
    .fontSize(12)
    .text('ID', 50, doc.y, { continued: true })
    .text('ProductID', 100, doc.y, { continued: true })
    .text('Type', 180, doc.y, { continued: true })
    .text('Qty', 250, doc.y, { continued: true })
    .text('UserID', 300, doc.y, { continued: true })
    .text('Timestamp', 360, doc.y);
  doc.moveDown(0.5);

  logs.forEach(log => {
    doc
      .text(log.id.toString(), 50, doc.y, { continued: true })
      .text(log.productId.toString(), 100, doc.y, { continued: true })
      .text(log.type, 180, doc.y, { continued: true })
      .text(log.quantity.toString(), 250, doc.y, { continued: true })
      .text(log.userId.toString(), 300, doc.y, { continued: true })
      .text(log.timestamp.toISOString(), 360, doc.y);
    doc.moveDown(0.2);
  });

  doc.end();
};
