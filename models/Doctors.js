const mongoose = require('mongoose');
const db = require('./db');

// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  doctor_id: {
    type: Number,
    unique: true,
    required: true,
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  doctor_name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Doctor model based on the schema
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
