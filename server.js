const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/medicines', require('./routes/medicines'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/appointments', require('./routes/appointments'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MedAssist API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 MedAssist Server running on port ${PORT}`);
});
