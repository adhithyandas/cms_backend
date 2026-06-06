const express = require("express");
const router = express.Router();
const { getCourse } = require("../../controller/shared/courseController");

router.get("/", getCourse);

module.exports = router;
