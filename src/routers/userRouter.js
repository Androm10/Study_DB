const express = require('express');
const router = express.Router();

const walletController = require('../controllers/walletController');
const userController = require('../controllers/userController');

const operationsValidator = require('../validators/operationsValidator');
const validate = require('../middlewares/validationResultMiddle');


const timeOfRequestMiddle = require('../middlewares/timeOfRequestMiddle');           
const auth = require('../middlewares/authorize');
const { isAdmin } = require('../middlewares/isAdmin');


router.use(timeOfRequestMiddle);
router.use(auth);


router.post('/:id/wallet/addMoney', operationsValidator, validate, walletController.addMoney);
router.post('/:id/wallet/outputMoney', operationsValidator, validate, walletController.outputMoney);
router.get('/:id/wallet/operations', walletController.getOperations);
router.get('/:id/bets', userController.getBets);

router.post('/:id/deleteAccount', userController.deleteAccount);


router.get('/all', isAdmin, userController.getAllUsers );

module.exports = router;