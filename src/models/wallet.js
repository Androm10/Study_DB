const { DataTypes }= require('sequelize');
const sequelize = require('.');

let wallets = sequelize.define(
    'wallets',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: 'user_id'
            //unique: true
        },
        money: {
            type: DataTypes.FLOAT(8),
            defaultValue: 0
        },       
        info : {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false
    }
);

module.exports = wallets;