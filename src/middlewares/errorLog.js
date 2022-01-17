const logger = require('../mongodb');

module.exports = async function(error, req, res, next) {

    const errorLog = {

        name : error.name,
        
        message : error.message,
    
        date : Date.now()
    }
    
    logger.createErrorLog(errorLog);

    next(error);
}