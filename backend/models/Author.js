const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.models.Author || mongoose.model('Author', authorSchema);