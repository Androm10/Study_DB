let bcrypt = require('bcrypt');

exports.cryptPassword = async function(password) {
    
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
     
};

exports.comparePassword = function(plainPass, hashword) {

    return  bcrypt.compareSync(plainPass, hashword);

};

exports.cryptMessage = async function(msg) {
    
    let salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(msg, salt);
     
};