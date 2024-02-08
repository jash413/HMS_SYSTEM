const mongoose = require('mongoose');
const db = require('./db');

const consentFormSchema = new mongoose.Schema({
  surgery_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Surgery', required: true },
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  consent_text: { type: String, required: true },
  signature: { type: Buffer },
});

const ConsentForm = mongoose.model('ConsentForm', consentFormSchema);

module.exports = ConsentForm;
