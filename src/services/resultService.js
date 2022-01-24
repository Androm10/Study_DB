const express = require('express');
const resultRepository = require('../repository/resultRepository');
const eventRepository = require('../repository/eventRepository');
const betRepository = require('../repository/betRepository');
const walletService = require('./walletService');
const buildError = require('../utils/buildError');


module.exports = resultService = {

    addResult : async function(eventId, instance) {

        return resultRepository.addResult(eventId, instance);
    },

    getAllResults : async function(eventId) {

        return resultRepository.getAllResults(eventId);
    },

    deleteResult : async function(resultId) {

        return resultRepository.deleteResult(resultId);
    },

    selectWinningResult : async function(resultId) {

        let result = await resultRepository.getById(resultId);
        
        if(!result)
            throw(buildError(400, 'no such result'));

        let event = await result.getEvent();
        
        if(!event.isActive)
            throw(buildError(400, 'event already completed'));

        eventRepository.setEventCompleted(event.id);

        await resultRepository.selectWinningResult(event.id, resultId);
        
        let winningBets = await result.getBets();
        
        for(let winningBet of winningBets) {

            let prize = Number(winningBet.money)*(1 + Number(result.coefficient));
            
            await walletService.addPrize(winningBet.userId, prize);
        }

        return result;
    }
    
}