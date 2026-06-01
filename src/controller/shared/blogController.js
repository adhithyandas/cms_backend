const Blog = require('../../models/blogModel');
const { uploadToS3 } = require('../../utils/s3Upload');

const addBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        const thumbnail = req.file;
        if (!title || !description || !thumbnail) {
            return res.status(400).json({ message: 'Title, description and thumbnail are required' });
        }
        const url = await uploadToS3(thumbnail, 'blog');
        const blog = await Blog.create({ title, description, thumbnail: url });
        res.status(201).json(blog);
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getBlog = async (req, res) => {
    try {
        const blog = await Blog.find();
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const thumbnail = req.file;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }
        let url;
        if (thumbnail) {
            url = await uploadToS3(thumbnail, 'blog');
        }
        const updateData = { title, description };
        if (url) updateData.thumbnail = url;
        
        const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addBlog, getBlog, updateBlog, deleteBlog };
