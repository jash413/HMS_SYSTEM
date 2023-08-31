const mongoose = require('mongoose');
const db = require('./db');

const operationTheatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  operatingHours: {
    startTime: { type: String, default: '09:00' },
    endTime: { type: String, default: '17:00' },
  },
  bookedSlots: [
    {
      date:{ type: Date },
      startTime: { type: String },
      endTime: { type: String },
    },
  ],
});

const OperationTheatre = mongoose.model('OperationTheatre', operationTheatreSchema);

module.exports = OperationTheatre;
