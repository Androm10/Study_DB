const express = require('express');
const router = express.Router();

const walletController = require('../controllers/walletController');



router.use( (req, res, next) => {
    console.log('server: request to ' + req.url + 
    '\tmethod: ' + req.method +
    '\ttime: ' + new Date);
    next();
});

router.post('/:id/wallet/addMoney', walletController.addMoney);

module.exports = router;