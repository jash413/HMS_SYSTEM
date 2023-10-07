const mongoose = require("mongoose");

const labResultsSchema = new mongoose.Schema({
  
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
