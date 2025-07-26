import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/db.config.js';

class User extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public passwordHash!: string;

  public role!: 'ADMIN' | 'STAFF';

  public notificationPreferences?: string;

  public phone!: string;

  public businessId!: number;

  public readonly createdAt!: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('ADMIN', 'STAFF'), allowNull: false },
    notificationPreferences: { type: DataTypes.JSON, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    businessId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'user', timestamps: true }
);

export default User;
