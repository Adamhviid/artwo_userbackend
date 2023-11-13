import { Sequelize } from "sequelize";
import sql from "mssql";
import * as dotenv from "dotenv";
dotenv.config();

const connection = new Sequelize(
    process.env.AZURE_DATABASE_DATABASE,
    process.env.AZURE_DATABASE_USERNAME,
    process.env.AZURE_DATABASE_PASSWORD,
    {
        dialect: "mssql",
        host: process.env.AZURE_DATABASE_SERVER,
        port: parseInt(process.env.AZURE_DATABASE_PORT),
        dialectOptions: {
            options: {
                encrypt: true,
            },
        },
    }
);

connection
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

//local db
/* const connection = new Sequelize(
    `${process.env.LOCAL_DATABASE_NAME}`,
    `${process.env.LOCAL_DATABASE_USERNAME}`,
    `${process.env.LOCAL_DATABASE_PASSWORD}`,
    {
        host: "localhost",
        dialect: "mysql",
    }
); */

export default connection;