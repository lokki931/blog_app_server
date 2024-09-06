const express = require('express');
const router = express.Router();

const { addPostTag, findPostOnTag, findTagOnPost } = require('../controllers/post_tag');

const { authenticateToken } = require('../utils/verifyToken');

router.post('/', authenticateToken, addPostTag);
router.get('/:id/tags', findPostOnTag);
router.get('/:id/posts', findTagOnPost);

module.exports = router;
