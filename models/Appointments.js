const mongoose = require('mongoose');
const db = require('./db');


const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctors',
    required: true,
  },
  date: {
    type: Date,

  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],

  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
      
