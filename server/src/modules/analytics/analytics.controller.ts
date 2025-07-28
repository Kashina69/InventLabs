import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../product/Product.model.js';
import Category from '../category/Category.model.js';
import getBusinessIdFromReq from '../../utils/getBusinessIdFromReq.utils.js';

export const getDistribution = async (req: Request, res: Response) => {
  try {
    const businessId = getBusinessIdFromReq(req);
    if (!businessId) {
      return res.status(401).json({ message: 'Unauthorized: No business ID found' });
    }

    const { filter = 'product' } = req.query;
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : null;

    // If filter is 'category' and categoryId is provided, treat as product filter for that category
    if (filter === 'category' && categoryId) {
      // Get all products for the given business and categoryId
      const products = await Product.findAll({
        where: { businessId, categoryId },
        attributes: ['id', 'name', 'stock', 'categoryId']
      });

      // Get the category name for the given categoryId
      const category = await Category.findOne({
        where: { id: categoryId, businessId },
        attributes: ['id', 'name']
      });

      const productDistribution = products.map(product => ({
        productId: product.id,
        productName: product.name,
        stock: product.stock,
        categoryId: product.categoryId,
        categoryName: category ? category.name : 'Unknown'
      }));

      const totalProducts = productDistribution.length;
      const totalStock = productDistribution.reduce((sum, product) => sum + product.stock, 0);

      return res.json({
        filter: 'product',
        summary: {
          totalProducts,
          totalStock
        },
        distribution: productDistribution
      });
    }

    // If filter is 'product' (or 'category' without categoryId), return all products (optionally filtered by categoryId)
    const whereClause: any = { businessId };
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const products = await Product.findAll({
      where: whereClause,
      attributes: ['id', 'name', 'stock', 'categoryId']
    });

    // Get category names for the products
    const categoryIds = [...new Set(products.map(p => p.categoryId))];
    const categories = await Category.findAll({
      where: { 
        id: { [Op.in]: categoryIds },
        businessId 
      },
      attributes: ['id', 'name']
    });

    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));

    const productDistribution = products.map(product => ({
      productId: product.id,
      productName: product.name,
      stock: product.stock,
      categoryId: product.categoryId,
      categoryName: categoryMap.get(product.categoryId) || 'Unknown'
    }));

    const totalProducts = productDistribution.length;
    const totalStock = productDistribution.reduce((sum, product) => sum + product.stock, 0);

    return res.json({
      filter: 'product',
      summary: {
        totalProducts,
        totalStock
      },
      distribution: productDistribution
    });

  } catch (error) {
    console.error('Error getting distribution:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getThresholdAnalysis = async (req: Request, res: Response) => {
  try {
    const businessId = getBusinessIdFromReq(req);
    if (!businessId) {
      return res.status(401).json({ message: 'Unauthorized: No business ID found' });
    }

    const { filter = 'product' } = req.query;
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : null;

    // If filter is 'category' and a specific categoryId is provided, treat like 'product' but scoped to that category
    if (filter === 'category' && categoryId) {
      // Get all products in the specific category
      const whereClause: any = { businessId, categoryId };
      const products = await Product.findAll({
        where: whereClause,
        attributes: ['id', 'name', 'stock', 'threshold', 'categoryId']
      });

      // Get the category name
      const category = await Category.findOne({
        where: { id: categoryId, businessId },
        attributes: ['id', 'name']
      });

      const productsBelowThreshold = products.filter(product => product.stock < product.threshold);
      const totalDeficit = productsBelowThreshold.reduce((sum, product) => sum + (product.threshold - product.stock), 0);

      const productThresholdAnalysis = productsBelowThreshold.map(product => ({
        productId: product.id,
        productName: product.name,
        currentStock: product.stock,
        threshold: product.threshold,
        deficit: product.threshold - product.stock,
        categoryId: product.categoryId,
        categoryName: category ? category.name : 'Unknown'
      }));

      return res.json({
        filter: 'product',
        summary: {
          totalProducts: products.length,
          productsBelowThreshold: productsBelowThreshold.length,
          totalDeficit
        },
        thresholdAnalysis: productThresholdAnalysis
      });
    }

    if (filter === 'category') {
      // Get threshold analysis by category (all categories)
      const categories = await Category.findAll({
        where: { businessId },
        attributes: ['id', 'name']
      });

      const categoryThresholdAnalysis = await Promise.all(
        categories.map(async (category) => {
          const whereClause: any = { businessId, categoryId: category.id };
          const products = await Product.findAll({
            where: whereClause,
            attributes: ['id', 'name', 'stock', 'threshold']
          });

          const productsBelowThreshold = products.filter(product => product.stock < product.threshold);
          const totalDeficit = productsBelowThreshold.reduce((sum, product) => sum + (product.threshold - product.stock), 0);

          return {
            categoryId: category.id,
            categoryName: category.name,
            totalProducts: products.length,
            productsBelowThreshold: productsBelowThreshold.length,
            totalDeficit,
            products: productsBelowThreshold.map(product => ({
              productId: product.id,
              productName: product.name,
              currentStock: product.stock,
              threshold: product.threshold,
              deficit: product.threshold - product.stock
            }))
          };
        })
      );

      const totalCategories = categoryThresholdAnalysis.length;
      const totalProducts = categoryThresholdAnalysis.reduce((sum, cat) => sum + cat.totalProducts, 0);
      const totalProductsBelowThreshold = categoryThresholdAnalysis.reduce((sum, cat) => sum + cat.productsBelowThreshold, 0);
      const grandTotalDeficit = categoryThresholdAnalysis.reduce((sum, cat) => sum + cat.totalDeficit, 0);

      return res.json({
        filter: 'category',
        summary: {
          totalCategories,
          totalProducts,
          totalProductsBelowThreshold,
          grandTotalDeficit
        },
        thresholdAnalysis: categoryThresholdAnalysis
      });
    } else {
      // Get threshold analysis by product (optionally filtered by categoryId)
      const whereClause: any = { businessId };
      if (categoryId) {
        whereClause.categoryId = categoryId;
      }

      const products = await Product.findAll({
        where: whereClause,
        attributes: ['id', 'name', 'stock', 'threshold', 'categoryId']
      });

      // Get category names for the products
      const categoryIds = [...new Set(products.map(p => p.categoryId))];
      const categories = await Category.findAll({
        where: { 
          id: { [Op.in]: categoryIds },
          businessId 
        },
        attributes: ['id', 'name']
      });

      const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));

      const productsBelowThreshold = products.filter(product => product.stock < product.threshold);
      const totalDeficit = productsBelowThreshold.reduce((sum, product) => sum + (product.threshold - product.stock), 0);

      const productThresholdAnalysis = productsBelowThreshold.map(product => ({
        productId: product.id,
        productName: product.name,
        currentStock: product.stock,
        threshold: product.threshold,
        deficit: product.threshold - product.stock,
        categoryId: product.categoryId,
        categoryName: categoryMap.get(product.categoryId) || 'Unknown'
      }));

      return res.json({
        filter: 'product',
        summary: {
          totalProducts: products.length,
          productsBelowThreshold: productsBelowThreshold.length,
          totalDeficit
        },
        thresholdAnalysis: productThresholdAnalysis
      });
    }

  } catch (error) {
    console.error('Error getting threshold analysis:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

