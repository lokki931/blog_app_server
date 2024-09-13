const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../utils/verifyToken');
const { addTag, tagsAll, updateTag, deleteTag, getTagById } = require('../controllers/tags');

router.post('/create', authenticateToken, addTag);
router.put('/:id/update', authenticateToken, updateTag);
router.delete('/:id/delete', authenticateToken, deleteTag);
router.get('/', tagsAll);
router.get('/:id/tag', getTagById);

module.exports = router;
