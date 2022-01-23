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
const paginate = require('../middlewares/paginate');


router.use(auth);

router.get('/mostLosses', eventController.mostLosses);
router.post('/', isAdmin, eventValidator, validate, eventController.addEvent);
router.delete('/:id', isAdmin, eventController.deleteEvent);
router.post('/:id/uploadImage',  eventController.uploadImage); 
router.delete('/:id/deleteImage',  eventController.deleteImage); 

router.post('/:id/results', isAdmin, resultValidator, validate, resultController.addResult);
router.get('/:id/results', resultController.getAllResults);
router.put('/:id/results/:resultId/setWinner', isAdmin, resultController.selectWinningResult);


router.get('/:id/bets', isAdmin , betController.getAllBetsOnEvent);
router.post('/:id/results/:resultId', operationValidator, validate, betController.addBet);

router.use(paginate);
router.get('/', eventController.getAllEvents);
router.get('/active', eventController.getActiveEvents);
router.get('/completed', eventController.getCompletedEvents);


module.exports = router;