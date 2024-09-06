const express = require('express');
const router = express.Router();

const {
  addCategory,
  categoriesAll,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

const { authenticateToken } = require('../utils/verifyToken');

const upload = require('../utils/multer');

router.post('/create', authenticateToken, upload.single('categoryImg'), addCategory);
router.put('/:id/update', authenticateToken, upload.single('categoryImg'), updateCategory);
router.delete('/:id/delete', authenticateToken, deleteCategory);
router.get('/', categoriesAll);

module.exports = router;
