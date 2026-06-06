const express = require("express");
const router = express.Router();
const { getBlog } = require("../../controller/shared/blogController");

router.get("/", getBlog);

module.exports = router;
