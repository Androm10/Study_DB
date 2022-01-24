const express = require('express');

const resultRepository = require('../repository/resultRepository');
const betRepository = require('../repository/betRepository');
const userRepository = require('../repository/userRepository');
const buildError = require('../utils/buildError');
const walletService = require('./walletService');


module.exports = betService = {

    getAllBetsOnEvent : async function(eventId) {

        let results = await resultRepository.getAllResults(eventId);
        let bets = [];
        
        for( let res of results) {
            bets = bets.concat(await resultRepository.getAllBets(res.id));
        }
  
        return bets;
    },


    addBet : async function(instance) {

        let user = await userRepository.getById(instance.userId);
        //CHECK IF USER ALREADY HAVE BET ON THIS EVENT
        let bets = await user.getBets();
        for(let userBet of bets){
            if(userBet.resultId == instance.resultId)
                throw(buildError(400, 'already have bet on this event'));
        }

        let bet = await betRepository.addBet(instance);    
        
        await walletService.betMoney(user.id, bet.money);

        return bet;
    },
    
}