const express = require('express');
const router = express.Router();

const walletController = require('../controllers/walletController');
const userController = require('../controllers/userController');

const operationsValidator = require('../validators/operationsValidator');
const validate = require('../middlewares/validationResultMiddle');
const paginate = require('../middlewares/paginate');
         
const auth = require('../middlewares/authorize');
const isAdmin = require('../middlewares/isAdmin');



router.use(auth);

router.delete('/deleteAccount', userController.deleteAccount);
router.post('/:id/wallet/addMoney', operationsValidator, validate, walletController.addMoney);
router.post('/:id/wallet/outputMoney', operationsValidator, validate, walletController.outputMoney);
router.get('/:id/bets', userController.getBets);


router.get('/mostPoints', userController.mostPoints);


router.use(paginate);
router.get('/all', isAdmin, userController.getAllUsers );
router.get('/:id/wallet/operations', walletController.getOperations);


module.exports = router;