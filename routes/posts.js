const express = require('express');
const router = express.Router();

const {
  addPost,
  postsAll,
  incrementLike,
  getPostById,
  postPublished,
  getUserPosts,
  updatePost,
  deletePost,
} = require('../controllers/posts');

const { authenticateToken } = require('../utils/verifyToken');

const upload = require('../utils/multer');
// post create
router.post('/create', authenticateToken, upload.single('postImg'), addPost);
// get published post
router.get('/', postsAll);
// get post by id
router.get('/:id/post', getPostById);
// update post
router.put('/:id/update', authenticateToken, upload.single('postImg'), updatePost);
// published post
router.put('/:id/published', authenticateToken, postPublished);
// get user post
router.get('/user', authenticateToken, getUserPosts);
// delete post by id
router.delete('/:id/delete', authenticateToken, deletePost);
// increment like post
router.put('/:id/like', incrementLike);

module.exports = router;
