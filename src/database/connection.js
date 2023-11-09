import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const connection = new Sequelize(
  `${process.env.DATABASE_NAME}`,
  `${process.env.DATABASE_USERNAME}`,
  `${process.env.DATABASE_PASSWORD}`,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default connection;
