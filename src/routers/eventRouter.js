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
const paginate = require('../middlewares/paginate');



router.use(auth);

router.get('/mostLosses', eventController.mostLosses);
router.post('/create', isAdmin, eventValidator, validate, eventController.addEvent);
router.post('/:id/delete', isAdmin, eventController.deleteEvent);
router.post('/:id/uploadImage',  eventController.uploadImage); 
router.post('/:id/deleteImage',  eventController.deleteImage); 

router.post('/:id/results/create', isAdmin, resultValidator, validate, resultController.addResult);
router.get('/:id/results', resultController.getAllResults);
router.post('/:id/results/:resultId/setWinner', isAdmin, resultController.selectWinningResult);


router.get('/:id/bets', isAdmin , betController.getAllBetsOnEvent);
router.post('/:id/results/:resultId/addBet', operationValidator, validate, betController.addBet);

router.use(paginate);
router.get('/', eventController.getAllEvents);
router.get('/active', eventController.getActiveEvents);
router.get('/completed', eventController.getCompletedEvents);

router.use(errorHandler);

module.exports = router;