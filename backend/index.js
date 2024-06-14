const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());

app.use(cors({
    origin: 'https://seo-news.vercel.app',
    credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Explicitly add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://seo-news.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Debugging middleware
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

app.use(express.json({ extended: false }));

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
