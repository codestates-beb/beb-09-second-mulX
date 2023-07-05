const express = require('express');
const router = express.Router();
const Controller = require('../controllers/home.controller');

router.get('/', Controller.welcome);

module.exports = router;
