const express = require('express');
const authService = require('../services/authService');
const buildError = require('../utils/buildError');
const responseHandler = require('../utils/responseHandler');
const { sendToMailer } = require('../amqp');
const { mailTypes } = require('../config');


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

    signUp : async function(req, res, next) {
        
        let user = {
            login : req.body.login,
            password : req.body.password
        }

        try {
            let result = await userService.addUser(user, req.body.username);

            let mail = {
                email : user.login, 
                nickname : req.body.username,
                type : mailTypes.meetMail
            }
            //send data to mailer
            sendToMailer(JSON.stringify(mail));

            responseHandler.sendSuccess(res, result, 201);
        }
        catch(error) {
            next(error);
        }

    },
    
};
module.exports = authController;