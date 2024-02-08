const mongoose = require("mongoose");

const medicationsSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Replace with the actual name of your Patient model
    required: true,
  },
  medicationName: {
    type: String,
  },
  dosage: {
    type: String,
  },
  frequency: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  // Add other fields as needed
});

const Medications = mongoose.model("Medications", medicationsSchema);

module.exports = Medications;
