const mongoose = require('mongoose');
const db = require('./db');

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  notification_id: {
    type: Number,
    unique: true,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Notification model based on the schema
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
