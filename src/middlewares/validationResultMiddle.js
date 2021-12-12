const { validationResult } = require('express-validator');
const responseHandler = require('../utils/responseHandler');


module.exports = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {         

        responseHandler.sendError(res, { errors : errors.array(), status : 400 });
        return;  
    }

    next();

}