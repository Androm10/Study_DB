const express = require('express');

const resultRepository = require('../repository/resultRepository');
const betRepository = require('../repository/betRepository');
const userRepository = require('../repository/userRepository');
const buildError = require('../utils/buildError');

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
        let bets = user.getBets();
        for(let userBet of bets){
            if(userBet.resultId == instance.resultId)
                throw(buildError(400, 'already have bet on this event'));
        }

        let bet = await betRepository.addBet(instance);    
        let wallet = await user.getWallet();
        
        let sum = Number(wallet.money) - Number(bet.money);

        if(+sum < 0)
            throw(buildError(400, 'cannot bet more money than wallet have'));

        wallet.update({money : sum});

        return bet;
    },
    
}