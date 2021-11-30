const express = require('express');
const router = express.Router();

const walletController = require('../controllers/walletController');


const timeOfRequestMiddle = require('../middlewares/timeOfRequestMiddle');           
router.use(timeOfRequestMiddle);


router.post('/:id/wallet/addMoney', walletController.addMoney);

module.exports = router;