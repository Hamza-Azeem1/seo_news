const express = require('express');
const router = express.Router();
const multer = require('multer');
const Author = require('../models/Author');

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Create a new author
router.post('/', upload.single('profilePicture'), async (req, res) => {
    try {
        const { name, designation } = req.body;
        const profilePicture = req.file.path;

        const author = new Author({ name, designation, profilePicture });
        await author.save();

        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all authors
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get authors by IDs
router.get('/authors', async (req, res) => {
    const { ids } = req.query;

    if (!ids) {
        return res.status(400).json({ message: 'No author IDs provided' });
    }

    try {
        const authorIds = ids.split(',');
        const authors = await Author.find({ _id: { $in: authorIds } });
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching authors', error });
    }
});

// Update an author
router.put('/:id', upload.single('profilePicture'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, designation } = req.body;
        const profilePicture = req.file ? req.file.path : req.body.profilePicture;

        const author = await Author.findByIdAndUpdate(id, { name, designation, profilePicture }, { new: true });
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an author
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findByIdAndDelete(id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;