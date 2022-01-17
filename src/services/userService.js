const express = require('express');
const userRepository = require('../repository/userRepository');
const buildError = require('../utils/buildError');

module.exports = userService = {

    getById : async function(userId) {

        return userRepository.getById(userId);
    
    },

    getAllUsers : async function(limit, offset) {
        
        return userRepository.getAllUsers(limit, offset);
        
    },

    addUser : async function(instance, username) {

        if(await userRepository.getByLogin(instance.login))
            throw(buildError(400, 'email already in use'));

        if(await userRepository.getByUsername(username))
            throw(buildError(400, 'username already in use'));

        return userRepository.addUser(instance, username);

    },

    deleteAccount : async function(userId) {

        return await userRepository.deleteAccount(userId);

    },

    getBets : async function(userId) {
        
        let user = await userRepository.getById(userId);
        
        let bets = await user.getBets();

        return bets;
    },

    mostPoints : async function(date) {
        
        let user = await userRepository.mostPoints(date);

        return user;
    },

    getLastBet : async function(userId) {

        let user = await userRepository.getById(userId);
        
        if(!user)
            throw(buildError(400, 'no such user'));

        let bet = await userRepository.getLastBet(userId);
        
        return bet;
    }

    
}