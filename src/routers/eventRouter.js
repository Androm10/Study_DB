const express = require('express');
const router = express.Router();


let { eventValidator } = require('../validators/eventValidator');
let eventAddController = require('../controllers/eventAddController');

router.use( (req,res,next) =>{
    console.log('server: request to ' + req.url + 
    '\tmethod: ' + req.method +
    '\ttime: ' + new Date);
    next();
});

router.post('/create', eventValidator, eventAddController);

module.exports = router;