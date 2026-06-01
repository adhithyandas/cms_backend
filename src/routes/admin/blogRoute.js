const express = require('express');
const router = express.Router();
const { addBlog, getBlog, updateBlog, deleteBlog } = require('../../controller/shared/blogController');
const { verifyToken } = require('../../middleware/verifyAdmin');

router.post('/', verifyToken, addBlog);
router.get('/', verifyToken, getBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

module.exports = router;
