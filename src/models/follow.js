import { DataTypes } from 'sequelize';
import connection from "../database/connection.js"

import user from './user.js';

const follow = connection.define('followers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    followId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

follow.associate = function (models) {
    follow.belongsTo(models.user, { foreignKey: 'userId' });
};

export default follow;
