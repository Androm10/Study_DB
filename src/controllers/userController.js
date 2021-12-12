const express = require('express');
const userService = require('../services/userService');
const responseHandler = require('../utils/responseHandler');

let userController = {

    getAllUsers : async function(req, res, next) {
        
        try {
            let users = await userService.getAllUsers()
            responseHandler.sendSuccess(res, users, 200); 
        }
        catch(error) {
            next(error);
        }

    },


    addUser : async function(req, res, next) {
        
        let user = {
            login : req.body.login,
            password : req.body.password
        }

        try {
            let result = await userService.addUser(user, req.body.username)
            responseHandler.sendSuccess(res, result, 201);
        }
        catch(error) {
            next(error);
        }

    },

    deleteAccount : async function(req, res, next) {
        
        try {
            let user = await userService.deleteAccount(req.user.id)
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
    }
  
};
module.exports = userController;