const mongoose = require('mongoose');
const db = require('../path/to/db.js');

// Define the Hospital schema
const hospitalSchema = new mongoose.Schema({
  hospital_id: {
    type: Number,
    unique: true,
    required: true,
  },
  hospital_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other hospital-specific fields as needed...
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Hospital model based on the schema
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
