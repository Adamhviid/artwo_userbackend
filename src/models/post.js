import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

import User from './user.js';

const post = connection.define("posts", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

export default post;
