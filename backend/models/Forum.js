const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    answers: [{
        content: String,
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        likes: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Forum || mongoose.model('Forum', ForumSchema);
