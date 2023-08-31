const mongoose = require('mongoose');
const db = require('./db.js');

// Define the Equipment schema
const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // Type of equipment (e.g., scalpel, microscope, ventilator)
  quantity: { type: Number, required: true },
  lastMaintenanceDate: { type: Date }, // Last maintenance date
  expiryDate: { type: Date }, // Expiry date for disposable items
  isSterile: { type: Boolean, default: true }, // Whether the equipment is sterile
});

// Define the Kit schema
const kitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }], // List of equipment IDs
  schedules: [
    {
      date: { type: Date }, // Date of kit usage
      startTime: { type: String }, // Start time of kit usage
      endTime: { type: String }, // End time of kit usage
    }
  ],
});

// Create the Equipment model based on the schema
const Equipment = mongoose.model('Equipment', equipmentSchema);

// Create the Kit model based on the schema
const Kit = mongoose.model('Kit', kitSchema);

module.exports = { Equipment, Kit };
