import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

interface UserAddModel {
  email: string;
  username: string;
  password: string;
}

interface UserViewModel {
  id: number;
  email: string;
  username: string;
  teamId?: number;
}

interface UserLoginModel {
  username: string;
  password: string;
}

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public teamId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  teamId: {
    type: new DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'users'
});

export { User, UserAddModel, UserLoginModel, UserViewModel };
