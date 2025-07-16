require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
