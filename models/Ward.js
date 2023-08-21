const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
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
});

const Ward = mongoose.model('Ward', wardSchema);

module.exports = Ward;
