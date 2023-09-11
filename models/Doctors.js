const mongoose = require("mongoose");
const db = require("./db");

// Define the Doctor schema
const doctorSchema = new mongoose.Schema(
  {
    // hospital_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Hospital',
    //   required: true,
    // },

    doctor_id: {
      type: String,
      unique: true,
      required: false,
    },
    // department_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Department',

    // },
    last_name: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: false,
    },
    // Qualification: {
    //   type: String,
    //   required: false,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    join_date: {
      type: String,
      required: true,
    },
    cabin: {
      type: String,
      required: true,
    },
    workingHours: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    bookedSlots: [
      {
        title: { type: String },
        date: { type: Date },
        startTime: { type: String },
        endTime: { type: String },
      },
    ], // Array of booked time slots
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Doctor model based on the schema
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
