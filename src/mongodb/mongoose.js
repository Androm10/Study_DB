const mongoose = require('mongoose');
const connection = require('../config').mongodb;

connect();

async function connect() {
    try {
        await mongoose.connect(connection);
        console.log("server: connection to mongodb success");
    }
    catch(error) {
        console.log("server: cannot connect to mongodb");
    }
}

module.exports = mongoose;