const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients", // Replace with the actual name of your Patient model
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  primaryCarePhysician: {
    type: String,
  },
  reasonForVisit: {
    type: String,
  },
  // Add other fields as needed
});

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
