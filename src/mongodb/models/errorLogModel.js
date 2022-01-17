const mongoose = require("../mongoose");

module.exports = new mongoose.model('errorLog', new mongoose.Schema({

    name : String,
    
    message : String,
    
    date : {type : Date, default: Date.now}
}));