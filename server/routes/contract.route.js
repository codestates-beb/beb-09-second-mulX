const express = require('express');
const router = express.Router();
const controller = require('../controllers/contract.controller');

router.post('/faucet', controller.faucet);
router.get('/faucet/:address', controller.balanceOfEth);
router.post('/token', controller.token);
router.get('/token/:address', controller.balanceOfToken);
router.post('/transfer', controller.transfer);

module.exports = router;
