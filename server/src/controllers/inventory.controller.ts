import { Request, Response } from 'express';
import Inventory from '../models/Inventory.model.js';
import Product from '../models/Product.model.js';
import InventoryLog from '../models/InventoryLog.model.js';

export const updateStock = async (req: Request, res: Response) => {
  const { productId, quantity, type } = req.body;

  if (!['ADD', 'REMOVE', 'RETURN', 'SALE'].includes(type)) {
    return res.status(400).json({ message: 'Invalid action type' });
  }

  const product = await Product.findByPk(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const newQuantity =
    type === 'ADD' || type === 'RETURN' ? product.stock + quantity : product.stock - quantity;

  if (newQuantity < 0) {
    return res.status(400).json({ message: 'Stock cannot go below 0' });
  }

  await product.update({ stock: newQuantity });

  await InventoryLog.create({
    productId,
    type,
    quantity,
    userId: req.user!.id,
  });

  res.json({ message: `Stock ${type}ed successfully`, stock: newQuantity });
};

export const getLogs = async (_: Request, res: Response) => {
  const logs = await InventoryLog.findAll({ order: [['timestamp', 'DESC']] });
  res.json(logs);
};

export const getInventory = async (req: Request, res: Response) => {
  const items = await Inventory.findAll();
  res.json(items);
};

export const addInventory = async (req: Request, res: Response) => {
  const { name, quantity, threshold } = req.body;
  const item = await Inventory.create({ name, quantity, threshold });
  res.status(201).json(item);
};
