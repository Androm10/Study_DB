const { DataTypes }= require('sequelize');

let bets = [
    'bets',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        result_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        money: {
            type: DataTypes.FLOAT(8),
            allowNull: false,
        },       
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
        },
    },
    {
        timestamps: false,
    }
]

module.exports = bets;