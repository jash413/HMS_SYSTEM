const mongoose = require("mongoose");
const db = require("./db");

// Define the Discharge Schema
const dischargeSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  dischargeDate: {
    type: Date,
    required: true,
  },
  dischargeTime: {
    type: String,
    required: true,
  },
  clinicalSummary: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatmentGiven: {
    type: String,
    required: true,
  },
  surgicalNotes: {
    type: String,
    required: true,
  },
  // You can add more fields as needed for your application
});

// Create the Discharge model
const Discharge = mongoose.model("Discharge", dischargeSchema);

module.exports = Discharge;
