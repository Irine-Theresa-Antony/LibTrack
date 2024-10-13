import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { adminrouter } from './routes/adminroute.js';

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow credentials to be included
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Use the adminrouter for API routes
app.use('/api', adminrouter);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
