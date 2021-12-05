const express = require('express');
const responseHandler = require('../utils/responseHandler');

let userController = {

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

    

};
module.exports = userController;