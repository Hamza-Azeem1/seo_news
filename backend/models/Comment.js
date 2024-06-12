const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    replies: [replySchema],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
