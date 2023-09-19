const mongoose = require("mongoose");

const clinicalExaminationsSchema = new mongoose.Schema({
  
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
