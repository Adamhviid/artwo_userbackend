import { DataTypes } from 'sequelize';
import connection from "../database/connection.js"

import follow from './follow.js';

const user = connection.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: '0',
        allowNull: false,
    },
}, {
    indexes: [
        {
            fields: ['username']
        },
        {
            fields: ['firstName']
        },
        {
            fields: ['lastName']
        },
        {
            fields: ['email']
        }
    ]
});

user.hasMany(follow, { foreignKey: 'userId' });

export default user;
