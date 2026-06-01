const express = require('express');
const router = express.Router();
const authRoutes = require('./admin/authRoute');
const galleryRoutes = require('./admin/galleryRoute');
const blogRoutes = require('./admin/blogRoute');
const courseRoutes = require('./admin/courseRoute');

router.use('/auth', authRoutes);
router.use('/gallery', galleryRoutes);
router.use('/blog', blogRoutes);
router.use('/course', courseRoutes);

module.exports = router;
