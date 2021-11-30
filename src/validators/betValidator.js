const express = require('express');
const { body, validationResult } = require('express-validator');
const responseHandler = require('../utils/responseHandler');
const buildError = require('../utils/buildError');


let betValidator = [

    body('money').notEmpty().custom( value => {
        if(+money <= 0)
            return false;
    }),
    (req, res, next) =>{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            responseHandler.sendError(res, buildError('400', { errors: errors.array() }));        
            return  console.log('server: validation failed');  
        }
        
        next();
        
    }

];

module.exports = betValidator;