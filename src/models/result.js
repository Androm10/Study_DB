const { DataTypes }= require('sequelize');
const sequelize = require('./sequelizeDB');

let results = sequelize.define(
    'results',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        eventId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: 'event_id'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        info: {
            type: DataTypes.TEXT
        },
        isWinner: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_winner'
        },
        coefficient: {
            type: DataTypes.FLOAT(8),
            allowNull: false
        }
    },
    {
        timestamps: false,
    }
);

module.exports = results;