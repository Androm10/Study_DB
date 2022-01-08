const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const userValidator = require('../validators/userValidator');

      
const validate = require('../middlewares/validationResultMiddle');
const errorHandler = require('../middlewares/errorHandler');

router.post('/signup', userValidator, validate, userController.addUser);
router.post('/login',  authController.logIn);


router.use(errorHandler);

module.exports = router;