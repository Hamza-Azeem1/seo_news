const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    meta_title: String,
    meta_description: String,
    img: String,
    img_title: String,
    img_caption: String,
    img_alt_text: String,
    schema: {
        type: String,
        required: true,
        unique: true,
    },
    slug_url: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    }],
});

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
