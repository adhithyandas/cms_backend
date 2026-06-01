const express = require('express');
const router = express.Router();
const { getGallery, addGallery, deleteGallery } = require('../../controller/shared/galleryController');
const { verifyToken } = require('../../middleware/verifyAdmin');

router.post('/', verifyToken, addGallery);
router.get('/', verifyToken, getGallery);
router.delete('/:id', verifyToken, deleteGallery);

module.exports = router;
