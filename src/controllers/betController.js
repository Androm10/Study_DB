const express = require('express');
const betService = require('../services/betService');
const responseHandler = require('../utils/responseHandler');

let betController = {

    getAllBetsOnEvent : async function(req, res, next) {

        try {
            let bets = await betService.getAllBetsOnEvent(req.params.id);
            responseHandler.sendSuccess(res, bets, 200);
        }
        catch(error) {
            next(error);
        }

    },

    addBet : async function(req, res, next) {

        let bet = {
            userId : req.user.id,
            resultId : req.params.resultId,
            money: req.body.money,
            createAt : new Date()
        }
        try {
            let result = await betService.addBet(bet);
            responseHandler.sendSuccess(res, result, 201);
        }
        catch(error) {
            next(error);
        }

    }

};

module.exports = betController;