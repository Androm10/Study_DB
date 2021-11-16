const { DataTypes } = require('sequelize');
const sequelize = require('./sequelizeDB');

let users = sequelize.define(
    'users',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        }       
    },
    {
        timestamps: false
    }
);
                    //note: password handling here
module.exports = users;