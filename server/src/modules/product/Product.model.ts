// src/models/Product.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.config.js';

class Product extends Model {
  public id!: number;

  public sku!: string;

  public name!: string;

  public barcode!: string;

  public categoryId!: number;

  public stock!: number;

  public threshold!: number;

  public expiryDate!: Date;

  public businessId!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}
Product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sku: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    barcode: { type: DataTypes.STRING, allowNull: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
    threshold: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    expiryDate: { type: DataTypes.DATE, allowNull: true },
    businessId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'product',
    timestamps: true,
  }
);

export default Product;
