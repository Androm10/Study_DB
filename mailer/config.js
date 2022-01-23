let result = require('dotenv').config();

if (result.error) {
    console.log("mailer: error occured while reading .env data ");
    console.log(result.error);
}

console.log(result.parsed);


module.exports = {
    email : process.env.EMAIL || "email@gmail.com",
    pass : process.env.PASS || "1111",

    types : {
        meet : 0,
        deleteAcc : 1,
        changePassword : 2,
    }
}