const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URI from environment variables
const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
