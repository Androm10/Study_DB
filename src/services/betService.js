const express = require('express');
const event = require('../repository/eventRepository');
const buildError = require('../utils/buildError');
const result = require('../repository/resultRepository');
const bet = require('../repository/betRepository');

module.exports = betService = {

    getAllBetsOnEvent : async function(eventId) {

        let results = await result.getAllResults(eventId);
        let bets = [];
        
        for( let res of results) {
            bets = bets.concat(await result.getAllBets(res.id));
        }
  
        return bets;
    },

    addBet : async function(instance) {

        return bet.addBet(instance);
    }
    
}