// server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import path from 'path';


// Import routes
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartItemRoutes from './routes/cartItemRoutes.js';

dotenv.config();

const app = express();

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
const __dirname = path.resolve();
console.log("Backend __dirname:", __dirname);

app.use(cookieParser())
app.use(express.json());

// Mount API routes
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart-items', cartItemRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Error:', err));

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error.'
  res.status(statusCode).json({
      success: false,
      statusCode,
      message
  })
})