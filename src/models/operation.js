const { DataTypes } = require('sequelize');
const sequelize = require('.');

let operations = sequelize.define(
    'operations',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        walletId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: 'wallet_id'
        },
        createAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
            field: 'create_at'
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        money: {
            type: DataTypes.FLOAT(8),
            allowNull: false
        }       
    },
    {
        timestamps: false
    }
);  

module.exports = operations;