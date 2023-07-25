const mongoose = require('mongoose');
const db = require('./db');

// Define the Appointment schema
const appointmentSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  appointment_id: {
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
  appointment_date: {
    type: Date,
    required: true,
  },
  appointment_time: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'canceled'],
    default: 'pending',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Appointment model based on the schema
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
