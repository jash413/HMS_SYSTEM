const mongoose = require("mongoose");
const db = require("./db");

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
    required: true,
  },
  appointmentDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
  },
  endingTime: {
    type: String,
    required :true
  },
  startingTime: {
    type: String,
    required:true
  },
  selectedDate:{
    type:Date,
  
  }

});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
