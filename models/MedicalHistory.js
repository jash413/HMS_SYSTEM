const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients", // Replace with the actual name of your Patient model
    required: true,
  },
  conditions: [String],
  surgeries: [String],
  allergies: [String],
  medications: [String],
  familyHistory: {
    type: String,
  },
  // Add other fields as needed
});

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);

module.exports = MedicalHistory;
