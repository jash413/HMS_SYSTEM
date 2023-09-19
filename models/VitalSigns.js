const mongoose = require("mongoose");

const VitalSignsSchema = new mongoose.Schema({
  bloodPressure: {
    type: String,
    required: true,
  },
  heartRate: {
    type: String,
    required: true,
  },
  respiratoryRate: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

const VitalSigns = mongoose.model("VitalSigns", VitalSignsSchema);

module.exports = VitalSigns;
