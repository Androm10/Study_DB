const { DataTypes }= require('sequelize');

let roles = [
    'roles',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true
        },       
        name: {
            type: DataTypes.CHAR(50),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
]

module.exports = roles;