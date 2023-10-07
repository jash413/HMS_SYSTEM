const { time } = require('console');
const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  admissionDate: {
    type: Date,
    required: true,
  },
  admissionTime: {
    type: String,
    required: true,
  },
  wardNumber: {
    type: String,
  },
  doctor: {
    type: String,
  },
  notes: {
    type: String,
  },
  // Other admission-specific properties
});

const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;
