const express = require('express');
const userRepository = require('../repository/userRepository');
const walletRepository = require('../repository/walletRepository');

module.exports = walletService = {

     addMoney : async function(userId, money) {

        let user = await userRepository.getById(userId);
        let wallet = await user.getWallet();

        let operation = {
            walletId : wallet.id,
            createAt : Date.now(),
            type : "in",
            money : money,

        }
        wallet.createOperation(operation);
        return walletRepository.addMoney(userId, money);
        
    },

    outputMoney : async function(userId, money) {

        let user = await userRepository.getById(userId);
        let wallet = await user.getWallet();

        let operation = {
            walletId : wallet.id,
            createAt : Date.now(),
            type : "out",
            money : money,

        }

        wallet.createOperation(operation);

        return walletRepository.outputMoney(userId,money);
    
    },

    getOperations : async function(userId, limit, offset) {

        return walletRepository.getOperations(userId, limit, offset);
        
    }
}