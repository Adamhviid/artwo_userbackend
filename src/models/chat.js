import { DataTypes } from "sequelize";
import connection from "../database/connection.js";
import user from './user.js';

const chat = connection.define("chats", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id',
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

export default chat;