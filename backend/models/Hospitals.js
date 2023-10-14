const mongoose = require('mongoose');
const db = require('./db');

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

// Attach the auto-increment plugin to the hospital schema
// hospitalSchema.plugin(autoIncrement.plugin, {
//   model: 'Hospital', // Model name in which the auto-increment is applied
//   field: 'hospital_id', // The field to be auto-incremented
//   startAt: 1, // The initial value of the auto-increment field
//   incrementBy: 1, // The increment value for each new hospital
// });

// Create the Hospital model based on the schema
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
