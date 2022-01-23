const express = require('express');
const walletService = require('../services/walletService');
const responseHandler = require('../utils/responseHandler');


let walletController = {

    addMoney : async function(req, res, next) {
        
        try { 
            let money = await walletService.addMoney(req.user.id, req.body.money)
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
            let operations = await walletService.getOperations(req.user.id, req.query.limit, req.skip);

            let instanceCount = operations.count;
            let pageCount = Math.ceil(instanceCount / req.query.limit);

            let response = {
                operations : operations.rows,
                count : instanceCount,
                pages : pageCount,
                current : req.query.page
            }

            responseHandler.sendSuccess(res, response, 200);
        }
        catch(error) {
            next(error);
        }
    }

};
module.exports = walletController;