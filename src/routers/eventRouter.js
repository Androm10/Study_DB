const express = require('express');
const router = express.Router();


            /* VALIDATORS */
const eventValidator = require('../validators/eventValidator');
const resultValidator = require('../validators/resultValidator');
const operationValidator = require('../validators/operationsValidator');

            /* CONTROLLERS */
const eventController = require('../controllers/eventController');
const resultController = require('../controllers/resultController');
const betController = require('../controllers/betController');

            /* MIDDLEWARES */
const validate = require('../middlewares/validationResultMiddle');
const auth = require('../middlewares/authorize');
const isAdmin = require('../middlewares/isAdmin');
const errorHandler = require('../middlewares/errorHandler');



router.use(auth);

            /* EVENT RELATED */
router.post('/create', isAdmin, eventValidator, validate, eventController.addEvent);
router.post('/:id/delete', isAdmin, eventController.deleteEvent);              // note: add auth middleware
router.get('/', eventController.getAllEvents);
router.get('/active', eventController.getActiveEvents);
router.get('/completed', eventController.getCompletedEvents);

            /* RESULT RELATED */
router.post('/:id/results/create', isAdmin, resultValidator, validate, resultController.addResult);
router.get('/:id/results', resultController.getAllResults);
router.post('/:id/results/:resultId/setWinner', isAdmin, resultController.selectWinningResult);

            /* BET RELATED */
router.get('/:id/bets', isAdmin , betController.getAllBetsOnEvent);
router.post('/:id/results/:resultId/addBet', operationValidator, validate, betController.addBet);

router.use(errorHandler);

module.exports = router;