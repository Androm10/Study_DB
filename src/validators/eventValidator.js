const express = require('express');
const { body } = require('express-validator');
const config = require('../config/config');
const date = require('date-and-time');

let eventValidator = [

    body('name').notEmpty().isLength( {max: 100}),

    body('deletedAt').notEmpty().custom( (value) => {

        let valueDate;
        if((valueDate = date.parse(value, config.dateFormat)) == 'Invalid Date'){
            console.log('server: date is not matches the format');
            return false;
        }
      
        if(date.subtract(valueDate, new Date()).toDays() <= 0 ){
            console.log('server: wrong date');
            return false;
        }
    
        return true;
    })
];

module.exports = eventValidator;