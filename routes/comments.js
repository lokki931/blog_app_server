const express = require('express');
const router = express.Router();

const { addComment, postCommentsAll } = require('../controllers/comments');

const { authenticateToken } = require('../utils/verifyToken');

router.post('/create', authenticateToken, addComment);
router.get('/:id/comments', postCommentsAll);

module.exports = router;
