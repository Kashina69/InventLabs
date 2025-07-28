import { Request, Response } from 'express';
import InventoryLog from './InventoryLog.model.js';
import Product from '../product/Product.model.js';
import User from '../user/User.model.js';
import Category from '../category/Category.model.js';
import getBusinessIdFromUser from '../../utils/getBusinessIdFromReq.utils.js';
import { Op } from 'sequelize';

export const addInventoryLog = async (req: Request, res: Response) => {
  try {
    const { productId, type, quantity, userId } = req.body;

    // Validate required fields
    if (!productId || !type || !quantity || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: productId, type, quantity, userId',
      });
    }

    // Validate type enum
    const validTypes = ['ADD', 'REMOVE', 'RETURN', 'SALE'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid type. Must be one of: ADD, REMOVE, RETURN, SALE',
      });
    }

    // Get businessId from user/request
    const businessId = await getBusinessIdFromUser(req);
    if (!businessId) {
      return res.status(403).json({
        success: false,
        message: 'Business ID not found for user',
      });
    }

    // Create inventory log with businessId
    const inventoryLog = await InventoryLog.create({
      productId,
      type,
      quantity,
      userId,
      businessId,
      timestamp: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Inventory log created successfully',
      data: inventoryLog,
    });
  } catch (error) {
    console.error('Error creating inventory log:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getInventoryLogs = async (req: Request, res: Response) => {
  try {
    const businessId = await getBusinessIdFromUser(req);
    if (!businessId) {
      return res.status(403).json({
        success: false,
        message: 'Business ID not found for user',
      });
    }

    // Support both GET (query) and POST (body.query) for pagination
    const page = parseInt((req.query.page as string) || (req.body?.query?.page as string)) || 1;
    const limit = parseInt((req.query.limit as string) || (req.body?.query?.limit as string)) || 10;
    const offset = (page - 1) * limit;

    // Get filter parameters
    const search = (req.query.search as string) || (req.body?.query?.search as string);
    const category = (req.query.category as string) || (req.body?.query?.category as string);
    const logType = (req.query.type as string) || (req.body?.query?.type as string);
    const dateFrom = (req.query.dateFrom as string) || (req.body?.query?.dateFrom as string);
    // Set dateTo to today's date (end of day)
    const dateTo = new Date();
    dateTo.setHours(23, 59, 59, 999);

    // Build where clause for inventory logs
    const whereClause: any = { businessId };

    // Filter by log type (category)
    if (logType) {
      const trimmedType = logType.trim().toUpperCase();
      const validTypes = ['ADD', 'REMOVE', 'RETURN', 'SALE'];
      if (validTypes.includes(trimmedType)) {
        whereClause.type = trimmedType;
      }
    }

    // Filter by date range
    if (dateFrom || dateTo) {
      whereClause.timestamp = {};
      if (dateFrom) {
        whereClause.timestamp[Op.gte] = new Date(dateFrom);
      }
      if (dateTo) {
        whereClause.timestamp[Op.lte] = new Date(dateTo);
      }
    }

    // Optimized search: First find products matching search term
    let productIds: number[] | undefined;
    if (search) {
      const searchTerm = search.trim();
      const products = await Product.findAll({
        where: {
          businessId,
          [Op.or]: [
            { name: { [Op.iLike]: `%${searchTerm}%` } },
            { sku: { [Op.iLike]: `%${searchTerm}%` } },
            { barcode: { [Op.iLike]: `%${searchTerm}%` } }
          ]
        },
        attributes: ['id']
      });
      productIds = products.map(p => p.id);
      
      // If no products found, return empty result
      if (productIds.length === 0) {
        return res.status(200).json({
          success: true,
          data: {
            logs: [],
            pagination: {
              currentPage: page,
              totalPages: 0,
              totalItems: 0,
              itemsPerPage: limit,
            },
          },
        });
      }
      
      whereClause.productId = { [Op.in]: productIds };
    }

    // Build include clause with category filtering
    const includeClause: any[] = [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'sku', 'categoryId'],
        where: category ? {
          businessId,
          categoryId: {
            [Op.in]: await Category.findAll({
              where: {
                businessId,
                name: { [Op.iLike]: `%${category.trim()}%` }
              },
              attributes: ['id']
            }).then(cats => cats.map(c => c.id))
          }
        } : { businessId }
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
      },
    ];

    // Get logs with associations, filtered by businessId and other filters
    const { count, rows } = await InventoryLog.findAndCountAll({
      where: whereClause,
      include: includeClause,
      order: [['timestamp', 'DESC']],
      limit,
      offset,
    });

    // Get category names for the products
    const categoryIds = [...new Set(rows.map(log => log.product?.categoryId).filter(Boolean))];
    const categories = await Category.findAll({
      where: { id: { [Op.in]: categoryIds } },
      attributes: ['id', 'name']
    });
    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));

    // Format the response
    const formattedLogs = rows.map(log => ({
      id: log.id,
      productName: log.product?.name || 'Unknown Product',
      productSku: log.product?.sku || 'N/A',
      categoryName: categoryMap.get(log.product?.categoryId) || 'Unknown Category',
      userName: log.user?.name || 'Unknown User',
      type: log.type,
      quantity: log.quantity,
      timestamp: log.timestamp,
      status: log.type, // Using type as status
    }));

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      data: {
        logs: formattedLogs,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: count,
          itemsPerPage: limit,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching inventory logs:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
