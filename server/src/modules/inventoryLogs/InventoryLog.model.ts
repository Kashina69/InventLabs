import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.config.js';
import Product from '../product/Product.model.js';
import User from '../user/User.model.js';
import Business from '../business/Business.model.js'; // Make sure this exists

class InventoryLog extends Model {
  public id!: number;
  public productId!: number;
  public businessId!: number;
  public type!: 'ADD' | 'REMOVE' | 'RETURN' | 'SALE';
  public quantity!: number;
  public timestamp!: Date;

  // Associations
  public readonly product?: Product;
  public readonly user?: User;
  public readonly business?: typeof Business;
}

InventoryLog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    businessId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('ADD', 'REMOVE', 'RETURN', 'SALE'), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'inventory_log',
    timestamps: false,
  }
);

// Define associations
InventoryLog.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
InventoryLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });
InventoryLog.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });

export default InventoryLog;
