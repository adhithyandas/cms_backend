const express = require("express");
const router = express.Router();
const { getGallery } = require("../../controller/shared/galleryController");

router.get("/", getGallery);

module.exports = router;
