import { Request, Response } from 'express';
import Category from './Category.model.js';
import getBusinessIdFromReq from '../../utils/getBusinessIdFromReq.utils.js'

// Helper to get businessId from token in cookies


export const add = async (req: Request, res: Response) => {
  const businessId = getBusinessIdFromReq(req);
  if (!businessId) return res.status(401).json({ error: 'Unauthorized' });

  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const category = await Category.create({ name, businessId });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add category', details: err });
  }
};

export const edit = async (req: Request, res: Response) => {
  const businessId = getBusinessIdFromReq(req);
  if (!businessId) return res.status(401).json({ error: 'Unauthorized' });

  const { id, name } = req.body;
  if (!id || !name) return res.status(400).json({ error: 'ID and name are required' });

  try {
    const category = await Category.findOne({ where: { id, businessId } });
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.name = name;
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to edit category', details: err });
  }
};

export const remove = async (req: Request, res: Response) => {
  const businessId = getBusinessIdFromReq(req);
  if (!businessId) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'ID is required' });

  try {
    const category = await Category.findOne({ where: { id, businessId } });
    if (!category) return res.status(404).json({ error: 'Category not found' });

    await category.destroy();
    res.json({ message: 'Category removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove category', details: err });
  }
};

export const list = async (req: Request, res: Response) => {
  const businessId = getBusinessIdFromReq(req);
  if (!businessId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const categories = await Category.findAll({ where: { businessId } });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list categories', details: err });
  }
};
