const mongoose = require("mongoose");

const prescriptionsSchema = new mongoose.Schema({
  patient:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    default:null,
    // required: true,
  },
  
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // Replace with the actual name of your Medications model
    // required: true,
  },
  
  medicines:[
    {
    medication:String,
    instructions:String
  },
]
});

const Prescriptions = mongoose.model("Prescriptions", prescriptionsSchema);

module.exports = Prescriptions;
