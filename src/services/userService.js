const express = require('express');
const userRepository = require('../repository/userRepository');
const buildError = require('../utils/buildError');
const crypt = require('../utils/crypt');


module.exports = userService = {

    getById : async function(userId) {

        return userRepository.getById(userId);
    
    },

    getAllUsers : async function(limit, offset, filter) {
        
        return userRepository.getAllUsers(limit, offset, filter);
        
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
    },

    editProfile : async function(userId, data) {
        
        let user = await userRepository.getById(userId);

        let userInfo = await user.getInformation();

        return await userInfo.update(data);
    },

    changePassword : async function(userId, data) {
        
        let user = await userRepository.getById(userId);
            
        if(!crypt.comparePassword(data.oldPassword, user.password))
            throw(buildError(400, 'Wrong old password'));

        return await userRepository.changePassword(userId, data.newPassword);

    },

    getAllDevs : async function() {
        let users = await userRepository.getAllDevs();

        return users;
    }

    
}