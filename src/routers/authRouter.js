const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const userValidator = require('../validators/userValidator');

const validate = require('../middlewares/validationResultMiddle');

router.post('/signup', userValidator, validate, authController.signUp);
router.post('/login',  authController.logIn);




module.exports = router;