const express = require('express');
const resultService = require('../services/resultService');
const responseHandler = require('../utils/responseHandler');

let resultController = {

  addResult :   function(req, res){
    console.log("server: starting add result operation");
    
    let result = {
      name : req.body.name,
      info : req.body.info ?? '',
      isWinner : false,
      coefficient : req.body.coefficient,
    }

     resultService.addResult(req.params.id, result)
     .then( (event) => {
      responseHandler.sendSuccess(res, event, 200);  
    })
    .catch( (error) => {
      console.log('server: unhandled error:\n ' + error);
      responseHandler.sendError(res, error);
    })

  },

  getAllResults : function(req, res) {
    console.log("server: starting show all results operation");

    resultService.getAllResults(req.params.id)
    .then( (results) => {
      responseHandler.sendSuccess(res, results, 200);
    })
    .catch( (error) => {
      console.log('server: unhandled error:\n ' + error);
      responseHandler.sendError(res, error);
    });

  },

  deleteResult : function(req, res){
    console.log("server: starting delete result operation");

    resultService.deleteResult(req.params.id)
    .then( (resultId) => {
      responseHandler.sendSuccess(res, resultId, 200);
    })
    .catch( (error) => {
      console.log('server: unhandled error:\n ' + error);
      responseHandler.sendError(res, error);
    });
  },

  selectWinningResult : function(req, res){
    console.log("server: starting select winning result operation");

    resultService.selectWinningResult(req.params.id, req.params.resultId)
    .then( (result) => {
      responseHandler.sendSuccess(res, result, 200);
    })
    .catch( (error) => {
      console.log('server: unhandled error:\n ' + error);
      responseHandler.sendError(res, error);
    });

  }

};
module.exports = resultController;