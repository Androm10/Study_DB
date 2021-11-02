const { DataTypes } = require('sequelize');

let operations = [
    'operations',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        wallet_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
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
]

module.exports = operations;