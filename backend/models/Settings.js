const mongoose = require('mongoose');
const db = require('./db');

// Define the Settings schema
const settingsSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  setting_id: {
    type: Number,
    unique: true,
    required: true,
  },
  setting_name: {
    type: String,
    required: true,
  },
  setting_value: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Settings model based on the schema
const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
