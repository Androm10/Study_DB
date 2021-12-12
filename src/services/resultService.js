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

    selectWinningResult : async function(id, resultId) {

        let event = await eventRepository.getEventById(id);
        let associatedEvent = await resultRepository.getAssociatedEvent(resultId);
        //if event does'nt exists - throw an error
        if(!event)
            throw(buildError(400, 'No Such event'));
        
        //if event doesn't matches the event associated to result - throw an error
        if(JSON.stringify(event) !== JSON.stringify(associatedEvent))
            throw(buildError(400, 'Event does not have requested result'));
        
        eventRepository.setEventCompleted(id);
        await resultRepository.selectWinningResult(id, resultId);
        
        let result = await resultRepository.getById(resultId);
        let winningBets = await resultRepository.getAllBets(resultId);

        for(let winningBet of winningBets) {
            let prize = Number(winningBet.money)*(1 + Number(result.coefficient));
            console.log("!!!!!!!!!!!!!!COEF = " + result.coefficient);

            await walletService.addMoney(winningBet.userId, prize);
        }

        return result;
    }
    
}