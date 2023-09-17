const mongoose = require("mongoose");

const clinicalExaminationsSchema = new mongoose.Schema({
  visit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visit", // Replace with the actual name of your Visit model
    required: true,
  },
  noteDate: {
    type: Date,
  },
  healthcareProvider: {
    type: String,
  },
  subjectiveNote: {
    type: String,
  },
  objectiveNote: {
    type: String,
  },
  assessment: {
    type: String,
  },
  plan: {
    type: String,
  },
  // Add other fields as needed
});

const ClinicalExaminations = mongoose.model("ClinicalExaminations", clinicalExaminationsSchema);

module.exports =  ClinicalExaminations;
