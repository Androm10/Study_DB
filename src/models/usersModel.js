const { DataTypes } = require('sequelize');

let users = [
    'users',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
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
                    //note: password handling here
module.exports = users;