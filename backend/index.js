const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Middleware
// app.use(cors());

const corsOptions = {
    origin: ['https://seo-news.vercel.app', 'https://www.seone.ws'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));


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
