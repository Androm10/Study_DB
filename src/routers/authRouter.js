const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const timeOfRequestMiddle = require('../middlewares/timeOfRequestMiddle');           
const validate = require('../middlewares/validationResultMiddle');
router.use(timeOfRequestMiddle);

const userValidator = require('../validators/userValidator');

router.post('/signup', userValidator, validate, userController.addUser);
router.post('/login',  authController.logIn);
router.post('/logout', passport.authenticate('jwt', {session: false}), authController.logOut);

module.exports = router;