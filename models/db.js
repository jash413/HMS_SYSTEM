const mongoose = require('mongoose');


// Set up MongoDB connection
mongoose.connect('mongodb+srv://jashmistry4444:SVjlOloq4CX6aNVE@cluster0.fran9pm.mongodb.net/hospital_management_system', {
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
