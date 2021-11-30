const express = require('express');
const walletService = require('../services/walletService');
const buildError = require('../utils/buildError');
const responseHandler = require('../utils/responseHandler');


let walletController = {

    addMoney : async function(req, res){
        
        console.log("server: start add money operation");

        if(+req.body.money < 0)
            responseHandler.sendError(
                res, 
                buildError(400, "You can't add negative numbers")
            );
        

        walletService.addMoney(req.params.id, req.body.money)
        .then( (money) => {
            responseHandler.sendSuccess(res, money, 200);  
        })
        .catch( (error) => {
            console.log('server: unhandled error:\n ' + error);
            responseHandler.sendError(res, error);
        })


    }

};
module.exports = walletController;