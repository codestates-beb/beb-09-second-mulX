const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/post', controller.user_join_post);
router.post('/post', controller.user_login_post);
router.get('/post/:id', controller.user_transfer_post);
router.delete('/post/:id', controller.user_transfer_post);

module.exports = router;
