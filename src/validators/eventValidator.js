const express = require('express');
const { body, validationResult } = require('express-validator');
const date = require('date-and-time');

                            //note: format is constant, so he needs to be saved in some file(config)
let eventValidator = [
    body('name').notEmpty().isLength( {max: 100}),
    body('deleted_at').custom( (value) =>{
        let value_date;
        if((value_date = date.parse(value,'DD/MM/YYYY HH:mm:ss')) == 'Invalid date'){
            console.log('server: date is not matches the format');
            return false;
        }

        let cur_date = date.format(new Date(), 'DD-MM-YYYY HH:mm::ss');
        console.log(cur_date);
        if(date.subtract(date.parse(cur_date,'DD/MM/YYYY HH:mm:ss'), value_date ).toDays() <= 0 ){ 
            console.log('server: wrong date');
            return false;
        }
        return true;
    })
];

module.exports = { eventValidator, validationResult };