const express = require('express');
const authService = require('../services/authService');
const buildError = require('../utils/buildError');
const responseHandler = require('../utils/responseHandler');

let authController = {

    logIn : async function (req, res, next) {

        if(!req.body.login || !req.body.password)
            responseHandler.sendError(res, buildError(400, 'empty field'));

        let user = {
            login : req.body.login,
            password : req.body.password
        }
        
        try {
            let token = await authService.logIn(user);
            responseHandler.sendSuccess(res, token, 200);
        }
        catch(error) {
            next(error);
        }

    },
    
};
module.exports = authController;