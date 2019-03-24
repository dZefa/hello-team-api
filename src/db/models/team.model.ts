import { Model, DataTypes, HasManyGetAssociationsMixin, Association } from 'sequelize';
import { sequelize } from '../index';

import { User } from './user.model';

interface TeamViewModel {
  id: number;
  name: string;
  type: string;
  users?: User[];
  comps?: Team[];
}

interface TeamAddModel {
  userId: number;
  name: string;
  type: string;
}

class Team extends Model {
  public id!: number;
  public name!: string;
  public type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUsers: HasManyGetAssociationsMixin<User>;
  public getTeams: HasManyGetAssociationsMixin<Team>;

  public readonly users?: User[];
  public readonly teams?: Team[];

  public static associations: {
    users: Association<Team, User>;
    teams: Association<Team, Team>;
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
  },
  teamId: {
    type: new DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'teams'
});

Team.hasMany(User, {
  foreignKey: 'teamId',
  as: 'users'
});

Team.hasMany(Team, {
  foreignKey: 'teamId',
  as: 'comps'
});

export { Team, TeamViewModel, TeamAddModel };
