const express = require('express');
const { body, validationResult } = require('express-validator');
const responseHandler = require('../utils/responseHandler');
const buildError = require('../utils/buildError');


let resultValidator = [
    body('name').notEmpty().isLength( {max: 100}),
    body('coefficient').notEmpty().isFloat().custom( (value) => {
        if(value <= 0 || value >= 1) return false;
        return true;
    }),
    (req, res, next) =>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            
            //responseHandler.sendError(res, buildError('400', errors.array()));
            res.status(400).json(errors.array());
            return  console.log('server: validation failed');  
        }
        next();
    }
];

module.exports = resultValidator;