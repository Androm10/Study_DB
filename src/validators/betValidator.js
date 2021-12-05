const express = require('express');
const { body } = require('express-validator');



let betValidator = [

    body('money').notEmpty().custom( value => {
        if(+money <= 0)
            return false;
            
    })
];

module.exports = betValidator;