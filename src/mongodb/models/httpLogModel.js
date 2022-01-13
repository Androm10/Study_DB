const mongoose = require("../mongoose");

module.exports = new mongoose.model('httpLog', new mongoose.Schema({

    url : String,
    
    method : String,

    headers : Object,
    
    params : Object,
    
    query : Object,
    
    body : Object,
    
    date : {type : Date, default: Date.now}
}));