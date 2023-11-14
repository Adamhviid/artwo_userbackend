import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

const tag = connection.define("tags", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    indexes: [
        {
            fields: ['tag']
        }
    ]
});

export default tag;