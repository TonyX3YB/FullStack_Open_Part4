// index.js
import { createServer } from 'http';
import { connect } from 'mongoose';
import app from './app.js'; // Import the app from app.js
import { config } from './utils/config.js'; // Import the config
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 3006;

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
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
