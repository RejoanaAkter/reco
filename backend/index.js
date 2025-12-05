
// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

// Import routes
import userRouter from './routes/userRoute.js';
import receipeRoute from './routes/receipeRoute.js';
import categoryRoute from './routes/catRoute.js';
import cuisineRoute from './routes/cuisineRoute.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use('/uploads', express.static(path.resolve('uploads'))); // Serve uploaded files
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/users', userRouter);
app.use('/recipes', receipeRoute);
app.use('/cat', categoryRoute);
app.use('/cuisines', cuisineRoute);

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Environment variables
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('DB connected successfully.');
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((error) => {
    console.error('DB connection error:', error.message);
    console.error('Full error:', error);
    if (error.code === 'ENOTFOUND') {
      console.error('Check your network or Atlas IP whitelist.');
    }
  });

// mongoose
//   .connect(MONGOURL)
//   .then(() => {
//     console.log("DB connected successfully.");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port :${PORT} `);
//     });
//   })
//   .catch((error) => console.log(error));
