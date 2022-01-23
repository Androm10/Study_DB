const express = require('express');
const { body } = require('express-validator');



let userInfoValidator = [

    body('username').isLength( {max : 30} ),

    body('firstName').isLength( {max: 30}).isAlpha(),

    body('lastName').isLength( {max: 30}).isAlpha(),

];

module.exports = userInfoValidator;