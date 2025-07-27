import { Request, Response } from 'express';
import Products from './Product.model.js';
import getBusinessIdFromReq from '../../utils/getBusinessIdFromReq.utils.js';
import Category from '../category/Category.model.js';

export const getAllProducts = async (_: Request, res: Response) => {
  const products = await Products.findAll();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Product id is required' });

  const product = await Products.findByPk(id as string);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { sku, categoryId, name, barcode, ...rest } = req.body;

  // Check if SKU already exists
  const existingSku = await Products.findOne({ where: { sku } });
  if (existingSku) return res.status(409).json({ message: 'SKU already exists' });

  // Check if product name already exists
  if (name) {
    const existingName = await Products.findOne({ where: { name } });
    if (existingName) return res.status(409).json({ message: 'Product name already exists' });
  }

  // Check if barcode already exists
  if (barcode) {
    const existingBarcode = await Products.findOne({ where: { barcode } });
    if (existingBarcode) return res.status(409).json({ message: 'Barcode already exists' });
  }

  // Check if categoryId is provided and valid
  if (!categoryId) return res.status(400).json({ message: 'categoryId is required' });
  const category = await Category.findByPk(categoryId);
  if (!category) return res.status(400).json({ message: 'Invalid categoryId it does not exist' });

  // Get businessId from util function
  const businessId = getBusinessIdFromReq(req);

  // Create product with only allowed fields
  const product = await Products.create({
    sku,
    categoryId,
    businessId,
    name,
    barcode,
    ...rest,
  });

  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.query.id as string;
  const { sku, name, barcode, categoryId, stock, threshold, expiryDate } = req.body;

  const product = await Products.findByPk(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  // Validate SKU uniqueness
  if (sku) {
    const existingSku = await Products.findOne({ where: { sku, id: { $ne: productId } } });
    if (existingSku) return res.status(409).json({ message: 'SKU already exists' });
  }

  // Validate name uniqueness
  if (name) {
    const existingName = await Products.findOne({ where: { name, id: { $ne: productId } } });
    if (existingName) return res.status(409).json({ message: 'Product name already exists' });
  }

  // Validate barcode uniqueness
  if (barcode) {
    const existingBarcode = await Products.findOne({ where: { barcode, id: { $ne: productId } } });
    if (existingBarcode) return res.status(409).json({ message: 'Barcode already exists' });
  }
  const businessId = getBusinessIdFromReq(req);

  await product.update({ sku, name, barcode, categoryId, stock, threshold, expiryDate });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Products.findByPk(req.query.id as string);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const userBusinessId = getBusinessIdFromReq(req);
  if (product.businessId !== userBusinessId) {
    return res.status(403).json({ message: 'Forbidden: Business ID mismatch' });
  }

  await product.destroy();
  res.json({ message: 'Product deleted' });
};
