const mongoose = require("../mongoose");

module.exports = new mongoose.model('dbLog',new mongoose.Schema({

    type : String,

    model : String,
    
    date : {type : Date, default: Date.now}
}));