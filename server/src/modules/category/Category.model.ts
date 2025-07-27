import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.config.js';

class Category extends Model {
  public id!: number;

  public name!: string;

  public businessId!: number;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    businessId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'category', timestamps: true }
);

export default Category;
