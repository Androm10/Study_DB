const { Sequelize } = require('sequelize');

const config = require('../config');
const logger = require('../mongodb');

const options = {
    host: config.DBConnection.host,
    port: config.DBConnection.port,
    dialect: 'mysql',
    define : {
        hooks : {
            afterCreate : (record, options) => {
                let log = {
                    type : 'afterCreate',
                    model : JSON.stringify(record),
                    date : Date.now()
                }
                logger.createDbLog(log);
            },
    
            beforeDestroy : (record, options) => {
                let log = {
                    type : 'afterDestroy',
                    model : JSON.stringify(record),
                    date : Date.now()
                }
                logger.createDbLog(log);
            }
        }
    }
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