const express = require('express');
const { body } = require('express-validator');



let resultValidator = [

    body('name').notEmpty().isLength( {max: 100}),

    body('coefficient').notEmpty().isFloat().custom( (value) => {

        if(value <= 0 || value >= 1) return false;
        return true;

    })

];

module.exports = resultValidator;