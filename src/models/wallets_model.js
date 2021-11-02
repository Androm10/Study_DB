const { DataTypes }= require('sequelize');

let wallets = [
    'wallets',
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
]

module.exports = wallets;