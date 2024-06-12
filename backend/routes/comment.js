const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// POST a new comment
router.post('/:blogId/comments', async (req, res) => {
    try {
        const { text } = req.body;
        const { blogId } = req.params;
        const comment = new Comment({
            text,
            blog: blogId
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET comments for a specific blog
router.get('/:blogId/comments', async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blog: blogId }).populate('replies');
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a reply to a comment
router.post('/:commentId/replies', async (req, res) => {
    try {
        const { text } = req.body;
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        comment.replies.push({ text });
        await comment.save();
        res.status(201).json(comment.replies[comment.replies.length - 1]);
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Like or unlike a comment
router.post('/:commentId/like', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.body.userId;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        const likedIndex = comment.likedBy.indexOf(userId);
        if (likedIndex === -1) {
            comment.likes += 1;
            comment.likedBy.push(userId);
        } else {
            comment.likes -= 1;
            comment.likedBy.splice(likedIndex, 1);
        }

        await comment.save();
        res.json(comment);
    } catch (error) {
        console.error('Error liking/unliking comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE comment
router.delete('/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
