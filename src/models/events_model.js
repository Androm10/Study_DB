const { DataTypes }= require('sequelize');

let events = [
    'events',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        creator_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        info: {
            type: DataTypes.TEXT
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
        },
        deleted_at: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
    }
]

module.exports = events;