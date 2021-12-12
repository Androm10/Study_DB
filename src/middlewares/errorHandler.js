const responseHandler = require("../utils/responseHandler")

module.exports =  (error, req, res, next) => {
    if(error)
        responseHandler.sendError(res, error);
    else 
        next();
    
}