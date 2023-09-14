const mongoose = require("mongoose");

const prescriptionsSchema = new mongoose.Schema({
  visit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visit", // Replace with the actual name of your Visit model
    required: true,
  },
  medication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medications", // Replace with the actual name of your Medications model
    required: true,
  },
  prescribingPhysician: {
    type: String,
  },
  instructions: {
    type: String,
  },
  // Add other fields as needed
});

const Prescriptions = mongoose.model("Prescriptions", prescriptionsSchema);

module.exports = Prescriptions;
