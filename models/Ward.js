const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    default: null,
  },
  wardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: { 
    type: String,
    enum: ['General', 'Semi-deluxe', 'Deluxe'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Vacant', 'Occupied', 'Blocked'],
    default: 'Vacant',
  },
  roomRate: {
    type: Number,
    required: true,
  },
});

const Ward = mongoose.model('Ward', wardSchema);

module.exports = Ward;
