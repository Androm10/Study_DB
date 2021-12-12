const { Sequelize } = require('sequelize');
const config = require('../config/config');

const options = {
    host: config.DBConnection.host,
    port: config.DBConnection.port,
    dialect: 'mysql'
}

const sequelize = new Sequelize(
    config.DBConnection.name, 
    config.DBConnection.user, 
    config.DBConnection.pass,
    options);

    sequelize.authenticate()
    .catch((e) => {
        console.log('server: cannot connect to db;' + e);
        return;
    });
    console.log('server: connection to db completed');
  
module.exports = sequelize;