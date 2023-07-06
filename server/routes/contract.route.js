const express = require('express');
const router = express.Router();
const controller = require('../controllers/contract.controller');

router.post('/contract/faucet', controller.faucet);
router.get('/contract/faucet', controller.searchEth);
router.post('/contract/token', controller.token);
router.get('/contract/token', controller.balanceOf);
router.post('/contract/transfer', controller.transfer);

module.exports = router;
