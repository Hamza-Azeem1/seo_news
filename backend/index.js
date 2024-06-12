const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use(cors({
    origin: 'https://seo-news.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/blog', require('./routes/blog'));
app.use('/api/comments', require('./routes/comment'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/authors', require('./routes/author'));
app.use('/api/links', require('./routes/links'));
app.use('/api/auth', require('./routes/auth'));



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
