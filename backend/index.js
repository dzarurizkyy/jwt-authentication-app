import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './config/database.js';
import router from './routes/index.js';

// Return hask value to original password
dotenv.config();

const app = express();

// Database connected
try {
  await db.authenticate();
  console.log('Database connected');
} catch(error) {
  console.log(error);
}

// Middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// Web Server connected
app.listen('5000', () => console.log('Server running on port 5000'));