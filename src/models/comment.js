import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

import post from './post.js';
import user from './user.js';

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
            model: user,
            key: 'id',
        },
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    indexes: [
        {
            fields: ['content']
        }
    ]
});

comment.belongsTo(user, { foreignKey: 'userId' });

export default comment;