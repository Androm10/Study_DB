const express = require('express');
const userService = require('../services/userService');
const responseHandler = require('../utils/responseHandler');

let userController = {

    getAllUsers : function(req, res) {
        console.log("server: starting add user operation");

        userService.getAllUsers()
         .then( (users) => {
            responseHandler.sendSuccess(res, users, 200);  
        })
        .catch( (error) => {
            console.log('server: unhandled error:\n ' + error);
            responseHandler.sendError(res, error);
        });

    },


    addUser : function(req, res) {
        console.log("server: starting add user operation");
        
        let user = {
            login : req.body.login,
            password : req.body.password
        }

         userService.addUser(user, req.body.username)
         .then( (user) => {
            responseHandler.sendSuccess(res, user, 201);  
        })
        .catch( (error) => {
            console.log('server: unhandled error:\n ' + error);
            responseHandler.sendError(res, error);
        })

    },

    deleteAccount : function(req, res) {
        
        userService.deleteAccount(req.user.id)
        .then( (user) => {
            responseHandler.sendSuccess(res, user, 200);  
        })
        .catch( (error) => {
            console.log('server: unhandled error:\n ' + error);
            responseHandler.sendError(res, error);
        });

    },

    getBets : async function(req, res, next) {
        try {
            let bets = await userService.getBets(req.user.id);
            responseHandler.sendSuccess(res, bets, 200);
        }
        catch(error) {
            next(error);
        }
    }
  
};
module.exports = userController;