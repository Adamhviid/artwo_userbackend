import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

import Post from './post.js';
import User from './user.js';

const comment = connection.define("comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id',
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default comment;