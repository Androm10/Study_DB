const { DataTypes } = require('sequelize');
const sequelize = require('./sequelizeDB');

let usersRoles = sequelize.define(
    'users_roles',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            field: 'user_id'
        },
        roleId: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            field: 'role_id'
        },      
    },
    {
        timestamps: false
    }
);

module.exports = usersRoles;