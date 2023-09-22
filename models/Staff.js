const mongoose = require("mongoose");
const db = require("./db");

// Define the Staff schema
const staffSchema = new mongoose.Schema(
  {
    // hospital_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Hospital',
    //   required: true,
    // },
    staff_id: {
      type: String,
      unique: true,
      required: false,
    },
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
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    hire_date: {
      type: String, // You can use a Date type if you want to store a date
      required: true,
    },
    user_created: {
      type: Boolean,
      default: false,
    },
    workingHours: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },

  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Staff model based on the schema
const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
