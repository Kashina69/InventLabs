import { Request, Response } from 'express';
import Products from './Product.model.js';
import getBusinessIdFromReq from '../../utils/getBusinessIdFromReq.utils.js';
import Category from '../category/Category.model.js';
import { Op } from 'sequelize';
import InventoryLog from '../inventoryLogs/InventoryLog.model.js';

export const getAllProducts = async (req: Request, res: Response) => {
  const businessId = getBusinessIdFromReq(req);
  const { categoryId = 0, search = '' } = req.query;

  // Build filter
  const where: any = { businessId };

  // Category filter
  if (categoryId && Number(categoryId) !== 0) {
    where.categoryId = Number(categoryId);
  }

  // Search filter (case-insensitive match on name or sku)
  if (search && typeof search === 'string' && search.trim() !== '') {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { sku: { [Op.like]: `%${search}%` } }
    ];
  }

  if (where.$or) {
    where[Op.or] = where.$or;
    delete where.$or;
  }

  const products = await Products.findAll({ where });

  const productsWithStatus = products.map((product: any) => {
    let status = 'in stock';
    if (product.stock <= 0) {
      status = 'out of stock';
    } else if (product.stock <= product.threshold) {
      status = 'low stock';
    }
    return { ...product.toJSON(), status };
  });

  res.json(productsWithStatus);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Product id is required' });

  const businessId = getBusinessIdFromReq(req);
  const product = await Products.findOne({ where: { id, businessId } });
  if (!product) return res.status(404).json({ message: 'Product not found' });

  let status = 'in stock';
  if (product.stock <= 0) {
    status = 'out of stock';
  } else if (product.stock <= product.threshold) {
    status = 'low stock';
  }

  res.json({ ...product.toJSON(), status });
};

export const createProduct = async (req: Request, res: Response) => {
  const { sku, categoryId, name, barcode, ...rest } = req.body;
  const businessId = getBusinessIdFromReq(req);

  const existingSku = await Products.findOne({ where: { sku, businessId } });
  if (existingSku) return res.status(409).json({ message: 'SKU already exists' });

  if (name) {
    const existingName = await Products.findOne({ where: { name, businessId } });
    if (existingName) return res.status(409).json({ message: 'Product name already exists' });
  }

  if (barcode) {
    const existingBarcode = await Products.findOne({ where: { barcode, businessId } });
    if (existingBarcode) return res.status(409).json({ message: 'Barcode already exists' });
  }

  if (!categoryId) return res.status(400).json({ message: 'categoryId is required' });
  const category = await Category.findByPk(categoryId);
  if (!category) return res.status(400).json({ message: 'Invalid categoryId it does not exist' });

  const product = await Products.create({
    sku,
    categoryId,
    businessId,
    name,
    barcode,
    ...rest,
  });

  // Inventory log for new product
  try {
    await InventoryLog.create({
      productId: product.id,
      businessId,
      type: 'NEW',
      quantity: product.stock ?? 0,
      userId: (req as any).user?.id,
      timestamp: new Date(),
    });
  } catch (err) {
    // Optionally log error but do not block product creation
    console.error('Failed to create inventory log for new product:', err);
  }

  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.query.id as string;
  const { sku, name, barcode, categoryId, stock, threshold, expiryDate } = req.body;
  const businessId = getBusinessIdFromReq(req);

  const product = await Products.findOne({ where: { id: productId, businessId } });
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (sku) {
    const existingSku = await Products.findOne({
      where: { sku, businessId, id: { $ne: productId } },
    });
    if (existingSku) return res.status(409).json({ message: 'SKU already exists' });
  }

  if (name) {
    const existingName = await Products.findOne({
      where: { name, businessId, id: { $ne: productId } },
    });
    if (existingName) return res.status(409).json({ message: 'Product name already exists' });
  }

  if (barcode) {
    const existingBarcode = await Products.findOne({
      where: { barcode, businessId, id: { $ne: productId } },
    });
    if (existingBarcode) return res.status(409).json({ message: 'Barcode already exists' });
  }

  // Detect stock change
  let logType: 'ADD' | 'REDUCED' | null = null;
  let logQuantity = 0;
  if (typeof stock === 'number' && stock !== product.stock) {
    if (stock > product.stock) {
      logType = 'ADD';
      logQuantity = stock - product.stock;
    } else if (stock < product.stock) {
      logType = 'REDUCED';
      logQuantity = product.stock - stock;
    }
  }

  await product.update({ sku, name, barcode, categoryId, stock, threshold, expiryDate });

  // Inventory log for stock change
  if (logType && logQuantity > 0) {
    try {
      await InventoryLog.create({
        productId: product.id,
        businessId,
        type: logType,
        quantity: logQuantity,
        userId: (req as any).user?.id,
        timestamp: new Date(),
      });
    } catch (err) {
      // Optionally log error but do not block product update
      console.error('Failed to create inventory log for stock update:', err);
    }
  }

  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const businessId = getBusinessIdFromReq(req);
  const product = await Products.findOne({ where: { id: req.query.id as string, businessId } });
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await product.destroy();
  res.json({ message: 'Product deleted' });
};
