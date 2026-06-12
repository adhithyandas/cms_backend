const Course = require('../../models/courseModel');

const addCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        
        if (!title || !description || !price) {
            return res.status(400).json({ message: 'Title, description and price are required' });
        }

        const course = await Course.create({ title, description, price });

        res.status(201).json(course);
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCourse = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const data = await Course.find().sort({ _id: -1 }).skip(skip).limit(limit);
        const total = await Course.countDocuments();

        res.status(200).json({ data, total, page, limit });
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;
        if (!title || !description || !price) {
            return res.status(400).json({ message: 'Title, description, and price are required' });
        }

        const updateData = { title, description, price };

        const course = await Course.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json(course);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course by id:', error);
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

module.exports = { addCourse, getCourse, getCourseById, updateCourse, deleteCourse };
