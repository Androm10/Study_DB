const { DataTypes }= require('sequelize');

let users = [
    'users',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        login: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        }       
    },
    {
        timestamps: false
    }
]

module.exports = users;