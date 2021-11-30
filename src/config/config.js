let result = require('dotenv').config();

if (result.error) {
    console.log("server: error occured while reading .env data ");
    console.log(result.error);
  }
  
console.log(result.parsed)


module.exports = config = {
    DBConnection : {
        user : process.env.DB_USER,
        pass : process.env.DB_PASS,
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        name : process.env.DB_NAME
    },

    dateFormat : 'DD/MM/YYYY HH:mm:ss'
}