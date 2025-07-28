import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../product/Product.model.js';
import Category from '../category/Category.model.js';
import getBusinessIdFromReq from '../../utils/getBusinessIdFromReq.utils.js';

export const getStockAlerts = async (req: Request, res: Response) => {
  try {
    const businessId = getBusinessIdFromReq(req);
    if (!businessId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get all categories for this business
    const categories = await Category.findAll({
      where: { businessId },
      attributes: ['id', 'name']
    });
    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));

    // Get products with 0 stock (out of stock)
    const outOfStockProducts = await Product.findAll({
      where: {
        businessId,
        stock: 0
      },
      attributes: ['id', 'name', 'sku', 'categoryId', 'stock', 'threshold', 'updatedAt']
    });

    // Get products below threshold (low stock)
    const lowStockProducts = await Product.findAll({
      where: {
        businessId,
        stock: {
          [Op.gt]: 0,
          [Op.lt]: require('sequelize').col('threshold')
        }
      },
      attributes: ['id', 'name', 'sku', 'categoryId', 'stock', 'threshold', 'updatedAt']
    });

    res.json({
      outOfStock: outOfStockProducts.map(product => ({
        name: product.name,
        sku: product.sku,
        categoryName: categoryMap.get(product.categoryId) || 'N/A',
        stock: product.stock,
        threshold: product.threshold,
        status: 'Out of Stock',
        lastUpdated: product.updatedAt
      })),
      lowStock: lowStockProducts.map(product => ({
        name: product.name,
        sku: product.sku,
        categoryName: categoryMap.get(product.categoryId) || 'N/A',
        stock: product.stock,
        threshold: product.threshold,
        status: 'Low Stock',
        lastUpdated: product.updatedAt
      }))
    });
  } catch (error) {
    console.error('Error fetching stock alerts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
