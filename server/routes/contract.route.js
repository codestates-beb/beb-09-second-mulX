const express = require('express');
const router = express.Router();
const controller = require('../controllers/contract.controller');

router.post('/contract/faucet', controller.user_join_post);
router.get('/contract/faucet', controller.user_login_post);
router.post('/contract/token', controller.user_transfer_post);
router.get('/contract/token', controller.user_transfer_post);
router.post('/contract/transfer', controller.user_transfer_post);

module.exports = router;
