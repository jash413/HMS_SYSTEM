const mongoose = require('mongoose');
const db = require('./db');

const operationTheatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  operatingHours: {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  bookedSlots: [
    {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
});

const OperationTheatre = mongoose.model('OperationTheatre', operationTheatreSchema);

module.exports = OperationTheatre;
