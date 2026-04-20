import dotenv from 'dotenv'
import { Sequelize } from 'sequelize';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'auth',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

export default sequelize;