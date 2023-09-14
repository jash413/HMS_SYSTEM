const mongoose = require("mongoose");

const labResultsSchema = new mongoose.Schema({
  visit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visit", // Replace with the actual name of your Visit model
    required: true,
  },
  testName: {
    type: String,
  },
  testDate: {
    type: Date,
  },
  testResult: {
    type: String,
  },
  referenceRange: {
    type: String,
  },
  // Add other fields as needed
});

const LabResults = mongoose.model("LabResults", labResultsSchema);

module.exports = LabResults;
