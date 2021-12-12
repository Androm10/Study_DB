const express = require('express');
const userRepository = require('../repository/userRepository');
const buildError = require('../utils/buildError');
const crypt = require('../utils/crypt');
const config = require('../config');
const jwt = require('jwt-simple');

module.exports = authService = {

    logIn : async function(instance) {
        let user = await userRepository.getByLogin(instance.login);
        
        if(!user)
            throw(buildError(400, 'Login or password is incorrect'));
    
        if(!crypt.comparePassword(instance.password, user.password))
            throw(buildError(400, 'Login or password is incorrect'));

        let payload = {
            userId: user.id
        }

        let token = jwt.encode(payload, config.secret);

        return {token: token};    
    },

    isAdmin : async function(instance) {

        let user = await userRepository.getById(instance.id);

        let roles = await user.getRoles();

        if(!roles)
            return false;

        for(let role of roles) {
            if(role.name == "Admin")   
                return true;
              
        }

        return false;
    }
    
}