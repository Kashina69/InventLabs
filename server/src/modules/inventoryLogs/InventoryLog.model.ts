import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.config.js';

class InventoryLog extends Model {
  public id!: number;

  public productId!: number;

  public type!: 'ADD' | 'REMOVE' | 'RETURN' | 'SALE';

  public quantity!: number;

  public userId!: number;

  public timestamp!: Date;
}

InventoryLog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
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

export default InventoryLog;
