const express = require('express');
const router = express.Router();

const walletController = require('../controllers/walletController');
const userController = require('../controllers/userController');

const operationsValidator = require('../validators/operationsValidator');
const validate = require('../middlewares/validationResultMiddle');

         
const auth = require('../middlewares/authorize');
const isAdmin = require('../middlewares/isAdmin');
const errorHandler = require('../middlewares/errorHandler');



router.use(auth);

router.post('/:id/wallet/addMoney', operationsValidator, validate, walletController.addMoney);
router.post('/:id/wallet/outputMoney', operationsValidator, validate, walletController.outputMoney);
router.get('/:id/wallet/operations', walletController.getOperations);
router.get('/:id/bets', userController.getBets);

router.post('/:id/deleteAccount', userController.deleteAccount);

router.get('/all', isAdmin, userController.getAllUsers );

router.use(errorHandler);

module.exports = router;