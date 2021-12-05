const express = require('express');
const user = require('../repository/userRepository');
const buildError = require('../utils/buildError');

module.exports = userService = {

     getById : async function(userId) {

        return user.getById(userId);
    
    },

    addUser : async function(instance, username) {

        if(await user.getByLogin(instance.login))
            throw(buildError(400, 'email already in use'));

        if(await user.getByUsername(username))
        throw(buildError(400, 'username already in use'));

        return user.addUser(instance, username);

    }

    
}