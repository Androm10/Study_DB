const express = require('express');
const { body } = require('express-validator');



let betValidator = [

    body('money').notEmpty().isNumeric().custom( value => {
        if(+money <= 0)
            return false;
        return true;
    })
    
];

module.exports = betValidator;