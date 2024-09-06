const express = require('express');
const router = express.Router();

const {
  addPostCategory,
  findCategoryOnPost,
  findPostOnCategory,
} = require('../controllers/post_category');

const { authenticateToken } = require('../utils/verifyToken');

router.post('/', authenticateToken, addPostCategory);
router.get('/:id/cats', findCategoryOnPost);
router.get('/:id/posts', findPostOnCategory);

module.exports = router;
