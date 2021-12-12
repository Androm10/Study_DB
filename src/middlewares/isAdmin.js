const authService = require('../services/authService');
const buildError = require('../utils/buildError');
const responseHandler = require('../utils/responseHandler');

module.exports = async (req, res, next) => {

    let isAdmin = await authService.isAdmin(req.user);

    if(isAdmin)
        next();
    else
        responseHandler.sendError(res, buildError(403, 'no access'));
        
}