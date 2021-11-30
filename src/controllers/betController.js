const express = require('express');
const betService = require('../services/betService');
const responseHandler = require('../utils/responseHandler');

let betController = {

  getAllBetsOnEvent : function(req, res) {
    
    console.log("server: starting show all bets operation");

    betService.getAllBetsOnEvent(req.params.id)
    .then( (bets) => {
      responseHandler.sendSuccess(res, bets, 200);
    })
    .catch( (error) => {
      console.log('server: unhandled error:\n ' + error);
      responseHandler.sendError(res, error);
    });

  },

  
  addBet : function(req, res) {

    console.log("server: starting add bet operation");

    let bet = {
      userId : req.body.userId,
      resultId : req.params.resultId,
      money: req.body.money,
      createAt : new Date()
    }


    betService.addBet(bet)
    .then( (bet) => {
      responseHandler.sendSuccess(res, bet, 200);
    })
    .catch( (error) => {
      console.log('server: unhandled error:\n ' + error);
      responseHandler.sendError(res, error);
    });


  }

};
module.exports = betController;