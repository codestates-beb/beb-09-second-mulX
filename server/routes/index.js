const express = require('express');
const router = express.Router();

const home = require('./home.route');
const user = require('./user.route');
const post = require('./post.route');

/* GET home page. */
router.use('/', home);
router.use('/user', user);
router.use('/post', post);

module.exports = router;
