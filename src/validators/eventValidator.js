const express = require('express');
const { body, validationResult } = require('express-validator');
const date = require('date-and-time');
const responseHandler = require('../utils/responseHandler');
const buildError = require('../utils/buildError');

                            //note: format is constant, so he needs to be saved in some file(config)   dotenv
let eventValidator = [

    body('name').notEmpty().isLength( {max: 100}),

    body('deletedAt').notEmpty().custom( (value) => {

        let valueDate;
        if((valueDate = date.parse(value,'DD/MM/YYYY HH:mm:ss')) == 'Invalid Date'){
            console.log('server: date is not matches the format');
            return false;
        }
      
        if(date.subtract(valueDate, new Date()).toDays() <= 0 ){
            console.log('server: wrong date');
            return false;
        }
    
        return true;
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

module.exports = eventValidator;