const mongoose = require('mongoose');
const db = require('./db');

const surgerySchema = new mongoose.Schema({
  surgeryID: { type: String, required: true, unique: true },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'patients', required: true },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'doctors', required: true },
  anaesthetist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'anaesthetists', required: true },
  theatre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'operationtheatres', required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  kit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'kits', required: true },
  surgeryType: { type: String, required: true },
  selectedDate: { type: Date, required: true },
  selectedStartTime: { type: String, required: true },
  selectedEndTime: { type: String, required: true },
  selectedSurgeon: { type: String, required: true },
  selectedAnaesthetist: { type: String, required: true },
  selectedTheatre: { type: String, required: true },
  selectedKit: { type: String, required: true },
  selectedPatient: { type: String, required: true },
});

const Surgery = mongoose.model('Surgery', surgerySchema);

module.exports = Surgery;