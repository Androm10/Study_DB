const express = require('express');

const { sendToMailer } = require('../amqp');
const { mailTypes } = require('../config');

const userService = require('../services/userService');
const responseHandler = require('../utils/responseHandler');


let userController = {

    getAllUsers : async function(req, res, next) {
        
        try {
            let users = await userService.getAllUsers(req.query.limit, req.skip);
            
            let instanceCount = users.count;
            let pageCount = Math.ceil(instanceCount / req.query.limit);

            let response = {
                users : users.rows,
                count : instanceCount,
                pages : pageCount,
                current : req.query.page
            }

            responseHandler.sendSuccess(res, response, 200); 
            
        }
        catch(error) {
            next(error);
        }

    },

    deleteAccount : async function(req, res, next) {

        try {
            
            let mail = {
                email : req.user.login, 
                nickname : req.body.username,
                type : mailTypes.deleteAccMail
            }

            let user = await userService.deleteAccount(req.user.id)
            
            //send data to mailer
            sendToMailer(JSON.stringify(mail));

            responseHandler.sendSuccess(res, user, 200);
        }
        catch(error) {
            next(error);
        }

    },

    getBets : async function(req, res, next) {
        
        try {
            let bets = await userService.getBets(req.user.id);
            responseHandler.sendSuccess(res, bets, 200);
        }
        catch(error) {
            next(error);
        }
    },

    mostPoints : async function(req,res,next) {

        try {
            let date = new Date(req.query.date);

            if(!date)
                date = new Date();

            let user = await userService.mostPoints(date);
            responseHandler.sendSuccess(res, user, 200);
        }
        catch(error) {
            next(error);
        }

    },

    editProfile : async function(req, res, next) {
        
        try {

            let data = {
                username : req.body.username,
                about : req.body.about || "no info",
                firstName : req.body.firstName,
                lastName : req.body.lastName
            }

            let result = await userService.editProfile(req.user.id, data);    
            responseHandler.sendSuccess(res, result, 200);
        }
        catch(error) {
            next(error);
        }
    },

    changePassword : async function(req, res, next) {

        let data = {
            newPassword : req.body.newPassword,
            oldPassword : req.body.oldPassword
        }

        try {

            let mail = {
                email : req.user.login,
                ip : req.ip,
                browser : req.headers['user-agent'], 
                type : mailTypes.changePasswordMail,
                date : Date.now()
            }

            let result = await userService.changePassword(req.user.id, data);

            //send data to mailer
            sendToMailer(JSON.stringify(mail));

            responseHandler.sendSuccess(res, result, 200);
        }
        catch(error) {
            next(error);
        }
    }

  
};
module.exports = userController;