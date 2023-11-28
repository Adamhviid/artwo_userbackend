import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

import post from './post.js';
import user from './user.js';

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
            model: user,
            key: 'id',
        },
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default like;