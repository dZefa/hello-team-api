import { Model, DataTypes, HasManyGetAssociationsMixin, Association } from 'sequelize';
import { sequelize } from '../index';

import { User } from './user.model';

enum TeamType {
  'COMP', 'TEAM'
}

class Team extends Model {
  public id!: number;
  public name!: number;
  public type!: Enumerator<TeamType>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUsers: HasManyGetAssociationsMixin<User>;

  public readonly users?: User[];

  public static associations: {
    users: Association<Team, User>;
  };
}

Team.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  type: {
    type: new DataTypes.ENUM('COMP', 'TEAM'),
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'teams'
});

Team.hasMany(User, {
  foreignKey: 'teamId',
  as: 'teams'
});

export { Team };
