const mongoose = require('mongoose');
const db = require('./db');

// Define the Upload schema
const uploadSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  upload_id: {
    type: Number,
    unique: true,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uploaded_at: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Upload model based on the schema
const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
