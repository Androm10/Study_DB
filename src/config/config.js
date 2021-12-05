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
        port : process.env.DB_PORT || "3306",
        name : process.env.DB_NAME || "DBName"
    },
    secret: process.env.DB_SECRET || "secret",


    dateFormat : 'DD/MM/YYYY HH:mm:ss'
}