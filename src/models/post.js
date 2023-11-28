import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

import user from './user.js';
import comment from './comment.js';
import like from './like.js';
import tag from './tag.js';
import follow from './follow.js';
import post_tag from './post_tag.js';

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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id',
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    indexes: [
        {
            fields: ['title']
        }
    ]
});

post.belongsTo(user, { foreignKey: 'userId' });
post.hasMany(comment, { foreignKey: 'postId' });
post.hasMany(like, { foreignKey: 'postId' });
post.belongsToMany(tag, { through: post_tag });

export default post;
