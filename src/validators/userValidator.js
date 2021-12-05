const express = require('express');
const { body } = require('express-validator');



let userValidator = [

    body('login').notEmpty().isEmail(),

    body('username').notEmpty().isLength( {max : 30, min : 5} ),

    body('password').notEmpty().isLength( {max : 30, min : 5} ).custom( (value) => {

        return !value.match(/[^a-zA-Z]/g);

    }),

    body('password-confirmation').custom( (value, { req }) => {

        if (value !== req.body.password) 
            return false;

        return true;

    })
];

module.exports = userValidator;