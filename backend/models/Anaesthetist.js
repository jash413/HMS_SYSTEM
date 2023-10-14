const mongoose = require('mongoose');
const db = require('./db');

const anaesthetistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  workingHours: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  bookedSlots: [
    {
      date:{ type: Date },
      startTime: { type: String },
      endTime: { type: String },
    }
  ], // Array of booked time slots
});

const Anaesthetist = mongoose.model('Anaesthetist', anaesthetistSchema);

module.exports = Anaesthetist;
