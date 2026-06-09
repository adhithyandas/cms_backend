const express = require('express');
const router = express.Router();
const { getBlog, getBlogById, addBlog, updateBlog, deleteBlog } = require('../../controller/shared/blogController');
const { verifyToken } = require('../../middleware/verifyAdmin');
const upload = require('../../config/multerConfig');

router.post('/', verifyToken, upload.single('thumbnail'), addBlog);
router.get('/', verifyToken, getBlog);
router.get('/:id', verifyToken, getBlogById);
router.put('/:id', verifyToken, upload.single('thumbnail'), updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

module.exports = router;
