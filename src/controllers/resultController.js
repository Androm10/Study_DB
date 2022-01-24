const express = require('express');
const resultService = require('../services/resultService');
const responseHandler = require('../utils/responseHandler');

let resultController = {

    addResult : async function(req, res, next) {

        let result = {
            name : req.body.name,
            info : req.body.info ?? '',
            isWinner : false,
            coefficient : req.body.coefficient,
        }

        try {
            let createdResult = await resultService.addResult(req.params.id, result)
            responseHandler.sendSuccess(res, createdResult, 201);
        }
        catch(error) {
            next(error);
        }

    },

    getAllResults : async function(req, res, next) {
        
        try {
            let results = await resultService.getAllResults(req.params.id)
            responseHandler.sendSuccess(res, results, 200);
        }
        catch(error) {
            next(error);
        }

    },

    deleteResult : async function(req, res, next) {

        try {
            let resultId = await resultService.deleteResult(req.params.id)
            responseHandler.sendSuccess(res, resultId, 200);
        }
        catch(error) {
            next(error);
        }
    },

    selectWinningResult : async function(req, res, next) {
        
        try {
            let result = await resultService.selectWinningResult(req.params.resultId)
            responseHandler.sendSuccess(res, result, 200);
        }
        catch(error) {
            next(error);
        }

    }

};
module.exports = resultController;