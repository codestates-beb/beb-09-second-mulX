const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');

router.post('/', controller.post);
router.get('/', controller.findAllPost);
router.get('/:post_id', controller.findByIdPost);
router.patch('/update/:post_id', controller.update);

module.exports = router;
