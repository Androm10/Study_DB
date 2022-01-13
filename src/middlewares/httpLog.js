const logger = require('../mongodb');


module.exports = async function(req, res, next) {

    const httpLog = {
        url : req.baseUrl,
        
        method: req.method,

        headers : req.headers,
    
        params : req.params,
    
        query : req.query,
    
        body : req.body,
    
        date : Date.now()
    }
    
    logger.createHttpLog(httpLog);

    next();
}