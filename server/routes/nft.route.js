const express = require('express');
const router = express.Router();
const controller = require('../controllers/nft.controller');

router.post('/mint', controller.mint);
router.get('/', controller.findAllNfts);
router.get('/:address', controller.findOwnerNfts);
router.post('/buy', controller.buyNft);

module.exports = router;
