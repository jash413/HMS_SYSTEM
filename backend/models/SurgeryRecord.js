const mongoose = require('mongoose');
const db = require('./db');

const surgeryRecordSchema = new mongoose.Schema({
  surgery_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Surgery', required: true },
  surgeon_notes: { type: String },
  anaesthetist_notes: { type: String },
  patient_condition: { type: String },
});

const SurgeryRecord = mongoose.model('SurgeryRecord', surgeryRecordSchema);

module.exports = SurgeryRecord;
