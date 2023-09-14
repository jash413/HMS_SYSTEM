const mongoose = require("mongoose");

const diagnosticImagingSchema = new mongoose.Schema({
  visit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visit", // Replace with the actual name of your Visit model
    required: true,
  },
  imagingType: {
    type: String,
  },
  imagingDate: {
    type: Date,
  },
  imagingResult: {
    type: String, // You can use this field to store an image URL or binary data
  },
  // Add other fields as needed
});

const DiagnosticImaging = mongoose.model("DiagnosticImaging", diagnosticImagingSchema);

module.exports = DiagnosticImaging;
