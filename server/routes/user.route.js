const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/:email', controller.findUser);

module.exports = router;
