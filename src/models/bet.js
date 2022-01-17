const { DataTypes }= require('sequelize');
const sequelize = require('.');

let bets = sequelize.define(
    'bets',
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
        },
        resultId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: 'result_id'
        },
        money: {
            type: DataTypes.FLOAT(8),
            allowNull: false,
        },       
        createAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
            field: 'create_at'
        },
    },
    {
        timestamps: false,
    }
);

module.exports = bets;