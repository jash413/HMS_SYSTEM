const mongoose = require('mongoose');
const db = require('./db');

const anaesthetistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  workingHours: {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  bookedSlots: [
    {
      startTime: { type: Date },
      endTime: { type: Date },
    }
  ], // Array of booked time slots
});

const Anaesthetist = mongoose.model('Anaesthetist', anaesthetistSchema);

module.exports = Anaesthetist;
