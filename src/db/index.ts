import { Sequelize } from 'sequelize';
import { dbLogger } from '../utils/logger';


export const sequelize = new Sequelize(process.env.DB_URL, { logging: dbLogger });
