const express = require('express');
const router = express.Router();

const home = require('./home.route');
const user = require('./user.route');

/* GET home page. */
router.use('/', home);
router.use('/user', user);

module.exports = router;
