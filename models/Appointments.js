const mongoose = require('mongoose');
const db = require('./db');


const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required : true
  },
  doctorName: {
    type: String,
    
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
      
