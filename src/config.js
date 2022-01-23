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
    mongodb : process.env.MONGO_CONN || "mongodb+srv://root:1@cluster0.ail2r.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority",
    secret: process.env.DB_SECRET || "secret",
    
    pagination : {
        limit : 5,
        maxLimit : 30
    },

    dateFormat : 'MM/DD/YYYY HH:mm:ss',

    mailTypes : {
        meetMail : 0,
        deleteAccMail : 1,
        changePasswordMail : 2,
    },

    
}