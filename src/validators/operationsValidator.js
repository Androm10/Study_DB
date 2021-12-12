const express = require('express');
const { body } = require('express-validator');



let operationValidator = [

    body('money').notEmpty().isNumeric().custom( (value, { req } ) => {
        
        if(+value < 0)
            return false;

        return true;
    })

];

module.exports = operationValidator;