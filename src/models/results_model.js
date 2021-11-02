const { DataTypes }= require('sequelize');

let results = [
    'results',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        event_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        info: {
            type: DataTypes.TEXT
        },
        is_winner: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        coefficient: {
            type: DataTypes.FLOAT(8),
            allowNull: false
        }
    },
    {
        timestamps: false,
    }
]

module.exports = results;