const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/nft', controller.user_join_post);
router.get('/nft/:address', controller.user_join_post);
router.post('/nft/mint', controller.user_login_post);
router.post('/nft/buy', controller.user_transfer_post);

module.exports = router;
