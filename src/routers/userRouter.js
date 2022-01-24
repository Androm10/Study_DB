const express = require('express');
const router = express.Router();

const walletController = require('../controllers/walletController');
const userController = require('../controllers/userController');

const operationsValidator = require('../validators/operationsValidator');
const userInfoValidator = require('../validators/userInfoValidator');
const passwordValidator = require('../validators/passwordValidator');

const validate = require('../middlewares/validationResultMiddle');
const paginate = require('../middlewares/paginate');
         
const auth = require('../middlewares/authorize');
const isAdmin = require('../middlewares/isAdmin');



router.use(auth);

router.delete('/', userController.deleteAccount);
router.post('/:id/wallet/addMoney', operationsValidator, validate, walletController.addMoney);
router.post('/:id/wallet/outputMoney', operationsValidator, validate, walletController.outputMoney);
router.get('/:id/bets', userController.getBets);
router.put('/:id', userInfoValidator, validate, userController.editProfile);

router.put('/:id/changePassword', passwordValidator, validate, userController.changePassword);


router.get('/mostPoints', userController.mostPoints);


router.use(paginate);
router.get('/', isAdmin, userController.getAllUsers );
router.get('/:id/wallet/operations', walletController.getOperations);


module.exports = router;