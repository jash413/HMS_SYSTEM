const mongoose = require('mongoose');
const db = require('./db');

// Define the EHR schema
const ehrSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  ehr_id: {
    type: Number,
    unique: true,
    required: true,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
  prescriptions: {
    type: String,
  },
  lab_results: {
    type: String,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the EHR model based on the schema
const EHR = mongoose.model('EHR', ehrSchema);

module.exports = EHR;
