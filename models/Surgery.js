const mongoose = require('mongoose');
const db = require('./db');

const surgerySchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  anaesthetist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Anaesthetist', required: true },
  theatre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OperationTheatre', required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  notes: { type: String },
});

const Surgery = mongoose.model('Surgery', surgerySchema);

module.exports = Surgery;
