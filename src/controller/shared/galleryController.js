const Gallery = require('../../models/galleryModel');
const { uploadToS3 } = require('../../utils/s3Upload');

const addGallery = async (req, res) => {
    try {
        const { image } = req.files;
        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }
        const url = await uploadToS3(image, 'gallery');
        const gallery = await Gallery.create({ image: url });
        res.status(201).json(gallery);
    } catch (error) {
        console.error('Error adding gallery:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find();
        res.status(200).json(gallery);
    } catch (error) {
        console.error('Error fetching gallery:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteGallery = async (req, res) => {
    try {
        const { id } = req.params;
        const gallery = await Gallery.findByIdAndDelete(id);
        res.status(200).json(gallery);
    } catch (error) {
        console.error('Error deleting gallery:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getGallery, addGallery, deleteGallery };
