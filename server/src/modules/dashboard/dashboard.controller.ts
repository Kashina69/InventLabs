import { Request, response, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../product/Product.model.js';
import Category from '../category/Category.model.js';
import getBusinessIdFromUser from '../../utils/getBusinessIdFromReq.utils.js';
import { getInventoryLogs } from '../inventoryLogs/inventroyLogs.controller.js';

export const counts = async (req: Request, res: Response) => {
  const businessId = await getBusinessIdFromUser(req);
  const [totalProducts, totalCategories, lowStock, outOfStock, productStock] = await Promise.all([
    Product.count({ where: { businessId } }),
    Category.count({ where: { businessId } }),
    Product.count({
      where: {
        businessId,
        [Op.and]: [Product.sequelize.literal('"Product"."stock" < "Product"."threshold"')],
      },
    }),
    Product.count({ where: { businessId, stock: 0 } }),
    Product.sum('stock', { where: { businessId } }),
  ]);

  res.json({
    totalProducts,
    totalCategories,
    lowStock,
    outOfStock,
    productStock,
  });
};

export const dashboard = async (req: Request, res: Response) => {
  const countsResponse = counts(req, res);
  const inventoryLogsResponse = await getInventoryLogs(req, res);
  res.json({
    counts: countsResponse,
    inventoryLogs: inventoryLogsResponse?.data?.data || null,
  });
};
