const { DataTypes } = require('sequelize');
const sequelize = require('.');
const crypt = require('../utils/crypt');

let users = sequelize.define(
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
            type: DataTypes.STRING(255),
            allowNull: false
        }       
    },
    {
        timestamps: false
    }
);
/*
users.addHook('beforeCreate', 'hashPassword', async (user, options) => {
    let hashedPassword = await crypt.cryptPassword(user.password); 
    user.password = hashedPassword;
});

users.beforeCreate(async (user, options) => {
    const hashedPassword = await crypt.cryptPassword(user.password)
    user.password = hashedPassword
    console.log("pass::" + user.password);
  })
*/
                    //note: password handling here
module.exports = users;