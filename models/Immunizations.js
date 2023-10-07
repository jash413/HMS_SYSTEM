const mongoose = require("mongoose");

const immunizationsSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients", // Replace with the actual name of your Patient model
    required: true,
  },
  vaccineName: {
    type: String,
  },
  vaccineDate: {
    type: Date,
  },
  administeredBy: {
    type: String,
  },
  // Add other fields as needed
});

const Immunizations = mongoose.model("Immunizations", immunizationsSchema);

module.exports = Immunizations;
