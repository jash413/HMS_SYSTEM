const mongoose = require('mongoose');
const db = require('./db');

// Define the Report schema
const reportSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  report_id: {
    type: Number,
    unique: true,
    required: true,
  },
  report_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  generated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  generated_at: {
    type: Date,
    required: true,
  },
  file_url: {
    type: String,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Report model based on the schema
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
