import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import User from './models/User.js';
import bcryptjs from 'bcryptjs';
import errorHandler from './middleware/error.js';
import asyncHandler from './middleware/asyncHandler.js';
import ErrorResponse from './utils/errorResponse.js';

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...', err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);

app.post('/register', asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  
  // Validate input
  if (!username || !email || !password) {
    return next(new ErrorResponse('Please provide all required fields', 400));
  }
  
  // Check if user already exists
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    return next(new ErrorResponse('User already exists with that email or username', 400));
  }
  
  // Create new user with password hashing handled by pre-save hook
  const user = await User.create({
    username,
    email,
    password
  });
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
}));

// 404 Route
app.use('*', (req, res, next) => {
  next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
