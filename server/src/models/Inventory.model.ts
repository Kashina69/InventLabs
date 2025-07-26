import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config.js';

class Inventory extends Model {
  public id!: number;

  public name!: string;

  public quantity!: number;

  public threshold!: number;
}

Inventory.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    threshold: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'inventory' }
);

export default Inventory;
