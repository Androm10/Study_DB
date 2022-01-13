const mongoose = require('mongoose');


connect();

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://root:1111@study.ail2r.mongodb.net/nostralog?retryWrites=true&w=majority');
        console.log("server: connection to mongodb success");
    }
    catch(error) {
        console.log("server: cannot connect to mongodb");
    }
}

module.exports = mongoose;