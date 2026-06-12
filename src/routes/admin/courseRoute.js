const express = require('express');
const router = express.Router();
const { addCourse, getCourse, getCourseById, updateCourse, deleteCourse } = require('../../controller/shared/courseController');
const { verifyToken } = require('../../middleware/verifyAdmin');

router.post('/', verifyToken, addCourse);
router.get('/', verifyToken, getCourse);
router.get('/:id', verifyToken, getCourseById);
router.put('/:id', verifyToken, updateCourse);
router.delete('/:id', verifyToken, deleteCourse);

module.exports = router;
