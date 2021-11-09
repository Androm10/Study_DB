const { DataTypes } = require('sequelize');

let usersRoles = [
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
]

module.exports = usersRoles;