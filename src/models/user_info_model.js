const { DataTypes }= require('sequelize');

let user_info = [
    'user_info',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },       
        avatar : {
            type: DataTypes.BLOB
        },
        about : {
            type: DataTypes.TEXT,
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
]

module.exports = user_info;