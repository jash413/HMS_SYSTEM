const mongoose = require('mongoose');
const db = require('./db');

// Define the Department schema
const departmentSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  department_id: {
    type: Number,
    unique: true,
    required: true,
  },
  department_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Department model based on the schema
const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
