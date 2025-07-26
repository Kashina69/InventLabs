import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Products from '../models/product.model.js';

export const getAllProducts = async (_: Request, res: Response) => {
  const products = await Products.findAll();
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Products.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const existing = await Products.findOne({ where: { sku: req.body.sku } });
  if (existing) return res.status(409).json({ message: 'SKU already exists' });

  const product = await Products.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const product = await Products.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await product.update(req.body);
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Products.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await product.destroy();
  res.json({ message: 'Product deleted' });
};
