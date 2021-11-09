const express = require('express');
const router = express.Router();


let { eventValidator } = require('../validators/eventValidator');
let eventController = require('../controllers/eventController');

router.use( (req,res,next) =>{
    console.log('server: request to ' + req.url + 
    '\tmethod: ' + req.method +
    '\ttime: ' + new Date);
    next();
});

router.post('/create', eventValidator, eventController.addEvent);

module.exports = router;