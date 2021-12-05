const express = require('express');
const authService = require('../services/authService');
const buildError = require('../utils/buildError');
const responseHandler = require('../utils/responseHandler');

let authController = {

    logIn : function(req, res) {
        console.log("server: starting logIn operation");

        if(!req.body.login || !req.body.password)
            responseHandler.sendError(res, buildError(400, 'empty field'));

        let user = {
            login : req.body.login,
            password : req.body.password
        }

        authService.logIn(user)
        .then( (token) => {
            responseHandler.sendSuccess(res, token, 200);
        })
        .catch( (error) => {
            console.log('server: unhandled error:\n ' + error);
            responseHandler.sendError(res, error);
        });
    },
    
};
module.exports = authController;