const express = require('express');
const { body } = require('express-validator');



let passwordValidator = [


    body('oldPassword').notEmpty().isLength( {max : 30, min : 5} ).custom( (value) => {

        return !value.match(/[^a-zA-Z]/g);

    }),

    body('newPassword').notEmpty().isLength( {max : 30, min : 5} ).custom( (value, {req}) => {

        if(value === req.body.oldPassword)
            return false;

        return !value.match(/[^a-zA-Z]/g);

    }),

    body('newPassword-confirmation').custom( (value, { req }) => {

        if (value !== req.body.newPassword) 
            return false;

        return true;

    })
];

module.exports = passwordValidator;