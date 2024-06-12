const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false // Initially not approved
    }
});


module.exports = mongoose.models.Link || mongoose.model('Link', linkSchema);
