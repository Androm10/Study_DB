const express = require('express');
const walletService = require('../services/walletService');
const responseHandler = require('../utils/responseHandler');


let walletController = {

    addMoney : async function(req, res, next) {
        
        try { 
            let money = await walletService.addMoney(req.params.id, req.body.money)
            responseHandler.sendSuccess(res, money, 200);  
        }
        catch(error) {
            next(error);
        }

    },

    outputMoney : async function(req, res, next) {
        
        try {
            let money = await walletService.outputMoney(req.user.id, req.body.money)
            responseHandler.sendSuccess(res, money, 200);  
        }
        catch(error) {
            next(error);
        }

    },

    getOperations : async function(req, res, next) {

        try {
            let operations = await walletService.getOperations(req.user.id);
            responseHandler.sendSuccess(res, operations, 200);
        }
        catch(error) {
            next(error);
        }
    }

};
module.exports = walletController;