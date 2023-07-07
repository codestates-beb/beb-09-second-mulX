const express = require('express');
const router = express.Router();

const home = require('./home.route');
const user = require('./user.route');
const post = require('./post.route');
const contract = require('./contract.route');

/* GET home page. */
router.use('/', home);
router.use('/user', user);
router.use('/post', post);
router.use('/contract', contract);

module.exports = router;
