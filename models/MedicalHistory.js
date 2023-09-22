const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    default: null,
  },
  conditions: {
    type: String,
  },
  surgeries: {
    type: String,
  },
  allergies: {
    type: String,
  },
  medications: {
    type: String,
  },
  familyHistory: {
    type: String,
  },
  // Immunization-related fields
  immunizations: [
    {
      vaccineName: String,
      vaccineDate: Date,
      administeredBy: String,
    },
  ]

});

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);

module.exports = MedicalHistory;
