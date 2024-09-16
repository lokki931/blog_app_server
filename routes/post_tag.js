const express = require('express');
const router = express.Router();

const { addPostTag, findPostOnTag, findTagOnPost } = require('../controllers/post_tag');

const { authenticateToken } = require('../utils/verifyToken');

router.post('/', authenticateToken, addPostTag);
router.get('/:id/tags', findTagOnPost);
router.get('/:id/posts', findPostOnTag);

module.exports = router;
