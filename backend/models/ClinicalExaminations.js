const mongoose = require("mongoose");

const clinicalExaminationsSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    default: null,
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
});

const ClinicalExaminations = mongoose.model("ClinicalExaminations", clinicalExaminationsSchema);

module.exports =  ClinicalExaminations;
