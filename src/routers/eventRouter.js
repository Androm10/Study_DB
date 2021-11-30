const express = require('express');
const router = express.Router();


const eventValidator = require('../validators/eventValidator');
const resultValidator = require('../validators/resultValidator');
const betValidator = require('../validators/betValidator');

const eventController = require('../controllers/eventController');
const resultController = require('../controllers/resultController');
const betController = require('../controllers/betController');


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

router.get('/:id/bets', betController.getAllBetsOnEvent);
router.get('/:id/results/:resultId/addBet', betValidator, betController.addBet);

module.exports = router;