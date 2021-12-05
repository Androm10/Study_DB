const express = require('express');
const router = express.Router();

const walletController = require('../controllers/walletController');


const timeOfRequestMiddle = require('../middlewares/timeOfRequestMiddle');           
const auth = require('../middlewares/authorize');
router.use(timeOfRequestMiddle);
router.use(auth);

router.post('/:id/wallet/addMoney', walletController.addMoney);

module.exports = router;