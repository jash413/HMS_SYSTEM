const mongoose = require('mongoose');
const db = require('./db');

// Define the Patient schema
const patientSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  patient_id: {
    type: Number,
    unique: true,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  patient_name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
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
  },
  emergency_contact: {
    type: String,
    required: true,
  },
  medical_history: {
    type: String,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Patient model based on the schema
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
