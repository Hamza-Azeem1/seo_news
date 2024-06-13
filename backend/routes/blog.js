const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//     },
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
// }).single('img');


// Use memory storage
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Adjust the file size limit as needed
}).single('img');

// @route GET api/blog
// @desc Get all blogs
// @access Public
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @route GET api/blog/:schema/:id
// @desc Get a single blog by ID
// @access Public
router.get('/:schema/:id', async (req, res) => {
    try {
        const blog = await Blog.findOne({ schema: req.params.schema, _id: req.params.id });
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @route POST api/blog
// @desc Create a new blog
// @access Public
router.post('/', upload, async (req, res) => {
    const {
        title,
        description,
        content,
        meta_title,
        meta_description,
        img_title,
        img_caption,
        img_alt_text,
        schema,
        slug_url,
        author_ids,
    } = req.body;

    const img = req.file ? req.file.filename : null;

    try {
        if (!title || !description || !content) {
            return res.status(400).json({ error: 'Title, description, and content are required' });
        }

        const newBlog = new Blog({
            title,
            description,
            content,
            meta_title,
            meta_description,
            img,
            img_title,
            img_caption,
            img_alt_text,
            schema,
            slug_url,
            author_ids: Array.isArray(author_ids) ? author_ids : [],
        });

        const blog = await newBlog.save();
        res.json(blog);
    } catch (err) {
        console.error('Error saving blog to database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// @route PUT api/blog/:id
// @desc Update an existing blog
// @access Public
router.put('/:id', upload, async (req, res) => {
    const {
        title,
        description,
        content,
        meta_title,
        meta_description,
        img_title,
        img_caption,
        img_alt_text,
        schema,
        slug_url,
        author_ids,
    } = req.body;

    const img = req.file ? req.file.filename : null;

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.content = content || blog.content;
        blog.meta_title = meta_title || blog.meta_title;
        blog.meta_description = meta_description || blog.meta_description;
        if (img) blog.img = img;
        blog.img_title = img_title || blog.img_title;
        blog.img_caption = img_caption || blog.img_caption;
        blog.img_alt_text = img_alt_text || blog.img_alt_text;
        blog.schema = schema || blog.schema;
        blog.slug_url = slug_url || blog.slug_url;
        blog.author_ids = Array.isArray(author_ids) ? author_ids : blog.author_ids;

        await blog.save();
        res.json(blog);
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// @route DELETE api/blog/:id
// @desc Delete an existing blog
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        await blog.deleteOne();
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;