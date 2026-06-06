const express = require("express");
const router = express.Router();
const courseRoutes = require("./user/courseRoute");
const blogRoutes = require("./user/blogRoute");
const galleryRoutes = require("./user/galleryRoute");

router.use("/course", courseRoutes);
router.use("/blog", blogRoutes);
router.use("/gallery", galleryRoutes);

module.exports = router;
