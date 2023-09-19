const mongoose = require("mongoose");

const prescriptionsSchema = new mongoose.Schema({

  medication: {
   type: String,
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
