const mongoose = require('mongoose');
require('dotenv').config();

// Set up MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Check if the connection is successful
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Handle connection error
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});



// Export the Mongoose connection object
module.exports = db;
