const Course = require('../../models/courseModel');
const { uploadToS3 } = require('../../utils/s3Upload');

const addCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const icon = req.file;
        if (!title || !description || !icon || !price) {
            return res.status(400).json({ message: 'Title, description, icon and price are required' });
        }
        const url = await uploadToS3(icon, 'course');
        const course = await Course.create({ title, description, icon: url, price });
        res.status(201).json(course);
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.find();
        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;
        const icon = req.file;
        if (!title || !description || !price) {
            return res.status(400).json({ message: 'Title, description, and price are required' });
        }
        let url;
        if (icon) {
            url = await uploadToS3(icon, 'course');
        }
        const updateData = { title, description, price };
        if (url) updateData.icon = url;

        const course = await Course.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(course);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
        res.status(200).json(course);
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addCourse, getCourse, updateCourse, deleteCourse };
