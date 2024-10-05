// index.js
import { createServer } from 'http';
import { connect } from 'mongoose';
import app from './app.js'; // Import the app from app.js
import config from './utils/config.js'; // Adjust this to default import
import dotenv from 'dotenv';
import http from 'http';
import logger from './utils/logger.js'; // Assuming you have a logger utility



dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 3001;

// MongoDB connection
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

// Create and start the HTTP server
const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
