const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const userValidator = require('../validators/userValidator');

const timeOfRequestMiddle = require('../middlewares/timeOfRequestMiddle');           
const validate = require('../middlewares/validationResultMiddle');
const errorHandler = require('../middlewares/errorHandler');

router.use(timeOfRequestMiddle);



router.post('/signup', userValidator, validate, userController.addUser);
router.post('/login',  authController.logIn);
//router.post('/logout', passport.authenticate('jwt', {session: false}), authController.logOut);

router.use(errorHandler);

module.exports = router;