const { validationResult } = require('express-validator');
const responseHandler = require('../utils/responseHandler');


module.exports =    (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {         
        //responseHandler.sendError(res, buildError('400', errors.array()));

        responseHandler.sendError(res, { errors : errors.array(), status : 400 });

        return  console.log('server: validation failed');  
    }

    next();

}