const logger = require('./mongodb');

let result = require('dotenv').config();

if (result.error) {
    console.log("server: error occured while reading .env data ");
    console.log(result.error);
  }
  
console.log(result.parsed)


module.exports = config = {
    DBConnection : {
        user : process.env.DB_USER || "user",
        pass : process.env.DB_PASS || "password",
        host : process.env.DB_HOST || "localhost",
        port : process.env.DB_PORT || "3307",
        name : process.env.DB_NAME || "DBName"
    },
    secret: process.env.DB_SECRET || "secret",
    
    pagination : {
        limit : 2,
        maxLimit : 30
    },

    dateFormat : 'DD/MM/YYYY HH:mm:ss',

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