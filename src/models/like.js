import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

import Post from './post.js';
import User from './user.js';

const like = connection.define("like", {
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
});

export default like;