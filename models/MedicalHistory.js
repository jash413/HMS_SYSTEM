const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema({
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
  ],
  // Add other fields as needed
});

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);

module.exports = MedicalHistory;
