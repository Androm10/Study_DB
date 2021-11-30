const express = require('express');
const wallet = require('../repository/walletRepository');

module.exports = walletService = {

     addMoney : async function(userId, money) {

        return wallet.addMoney(userId, money);
    },
    
}