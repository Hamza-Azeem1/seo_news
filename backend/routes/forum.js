const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');
const verifyToken = require('./auth').verifyToken;

// Fetch all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Forum.find().populate('author');
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch a single question by ID
router.get('/:id', async (req, res) => {
    try {
        const question = await Forum.findById(req.params.id).populate('author').populate('answers.author');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new question (authentication required)
router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const newQuestion = new Forum({ title, content, author: req.userId });

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add an answer to a question (authentication required)
router.post('/:id/answer', verifyToken, async (req, res) => {
    const { content } = req.body;
    try {
        const question = await Forum.findById(req.params.id).populate('author');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Save the answer with the author's ID
        question.answers.push({ content, author: req.userId });
        await question.save();

        // Fetch the updated question with populated author details
        const updatedQuestion = await Forum.findById(req.params.id).populate('author').populate('answers.author');
        res.status(201).json(updatedQuestion);
    } catch (error) {
        console.error('Error creating answer:', error);
        res.status(500).json({ message: error.message });
    }
});


// Like a question
router.post('/:id/like', async (req, res) => {
    try {
        const question = await Forum.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        question.likes = (question.likes || 0) + 1;
        await question.save();
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Like an answer
router.post('/:id/answer/:answerId/like', async (req, res) => {
    try {
        const question = await Forum.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const answer = question.answers.id(req.params.answerId);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        answer.likes = (answer.likes || 0) + 1;
        await question.save();
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Edit a question
router.put('/:id', async (req, res) => {
    try {
        const question = await Forum.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a question
router.delete('/:id', async (req, res) => {
    try {
        const question = await Forum.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Edit an answer
router.put('/:id/answer/:answerId', async (req, res) => {
    try {
        const question = await Forum.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const answer = question.answers.id(req.params.answerId);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        answer.content = req.body.content;
        await question.save();
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an answer
router.delete('/:id/answer/:answerId', async (req, res) => {
    try {
        const question = await Forum.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const answerIndex = question.answers.findIndex(answer => answer._id.toString() === req.params.answerId);
        if (answerIndex === -1) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        // Remove the answer from the answers array
        question.answers.splice(answerIndex, 1);
        await question.save();

        res.json({ message: 'Answer deleted successfully', question });
    } catch (error) {
        console.error('Error deleting answer:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


module.exports = router;