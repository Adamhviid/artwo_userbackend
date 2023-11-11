import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const connection = new Sequelize(
    `${process.env.LOCAL_DATABASE_NAME}`,
    `${process.env.LOCAL_DATABASE_USERNAME}`,
    `${process.env.LOCAL_DATABASE_PASSWORD}`,
    {
        host: "localhost",
        dialect: "mysql",
    }
);

export default connection;
