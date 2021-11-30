const express = require('express');
const router = express.Router();

            /* VALIDATORS */
const eventValidator = require('../validators/eventValidator');
const resultValidator = require('../validators/resultValidator');
const betValidator = require('../validators/betValidator');

            /* CONTROLLERS */
const eventController = require('../controllers/eventController');
const resultController = require('../controllers/resultController');
const betController = require('../controllers/betController');

            /* MIDDLEWARES */
const timeOfRequestMiddle = require('../middlewares/timeOfRequestMiddle');
const validationResultMiddle = require('../middlewares/validationResultMiddle');
            
router.use(timeOfRequestMiddle);

            /* EVENT RELATED */
router.post('/create', eventValidator, validationResultMiddle, eventController.addEvent);
router.post('/:id/delete', eventController.deleteEvent);              // note: add auth middleware
router.get('/', eventController.getAllEvents);
router.get('/active', eventController.getActiveEvents);
router.get('/completed', eventController.getCompletedEvents);

            /* RESULT RELATED */
router.post('/:id/results/create', resultValidator, validationResultMiddle, resultController.addResult);
router.get('/:id/results', resultController.getAllResults);
router.post('/:id/results/:resultId/setWinner', resultController.selectWinningResult);

            /* BET RELATED */
router.get('/:id/bets', betController.getAllBetsOnEvent);
router.get('/:id/results/:resultId/addBet', betValidator, validationResultMiddle, betController.addBet);

module.exports = router;