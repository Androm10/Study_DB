const { DataTypes }= require('sequelize');
const sequelize = require('.');

let events = sequelize.define(
    'events',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        creatorId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
            field: 'creator_id'
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        info: {
            type: DataTypes.TEXT
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_active'
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "",
            field: 'image'
        },
        createAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
            field: 'create_at'
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at'
        },
    },
    {
        timestamps: false,
    }
);

module.exports = events;