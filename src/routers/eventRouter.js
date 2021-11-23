const express = require('express');
const router = express.Router();


let eventValidator = require('../validators/eventValidator');
let resultValidator = require('../validators/resultValidator');
let eventController = require('../controllers/eventController');
const resultController = require('../controllers/resultController');

router.use( (req, res, next) =>{
    console.log('server: request to ' + req.url + 
    '\tmethod: ' + req.method +
    '\ttime: ' + new Date);
    next();
});

router.post('/create', eventValidator, eventController.addEvent);
router.post('/:id/delete', eventController.deleteEvent);              // note: add auth middleware
router.get('/', eventController.getAllEvents);
router.get('/active', eventController.getActiveEvents);
router.get('/completed', eventController.getCompletedEvents);

router.post('/:id/results/create', resultValidator, resultController.addResult);
router.get('/:id/results', resultController.getAllResults);
router.post('/:id/results/:resultId/setWinner', resultController.selectWinningResult);

module.exports = router;