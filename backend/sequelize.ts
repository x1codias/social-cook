import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const { DB_USERNAME, DB_NAME, DB_PASSWORD } =
  process.env;

console.log(DB_NAME)

// Connect to MySQL database from the server
const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
      dialect: 'mysql',
      host: 'localhost',
    }
  );

  export default sequelize;