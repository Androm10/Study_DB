const { DataTypes }= require('sequelize');
const sequelize = require('./sequelizeDB');

let roles = sequelize.define(
    'roles',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },       
        name: {
            type: DataTypes.CHAR(50),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = roles;