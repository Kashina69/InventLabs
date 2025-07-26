import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.config.js';

class Business extends Model {
  public id!: number;

  public name!: string;

  public inventoryId!: number;

  public readonly createdAt!: Date;
}

Business.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    inventoryId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'business', timestamps: true }
);

export default Business;
