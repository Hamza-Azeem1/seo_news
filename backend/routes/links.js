const express = require('express');
const router = express.Router();
const Link = require('../models/Links');

// POST route to add a new link
router.post('/', async (req, res) => {
    try {
        const { title, link } = req.body;
        const newLink = new Link({ title, link });
        await newLink.save();
        res.status(201).json({ message: 'Link added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add link' });
    }
});

router.post('/:id/approve', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        link.approved = true;
        await link.save();
        res.json({ message: 'Link approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to approve link' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        await link.remove();
        res.json({ message: 'Link deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete link' });
    }
});

module.exports = router;
