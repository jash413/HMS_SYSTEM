const mongoose = require('mongoose');
const db = require('./db');

const otEquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  is_available: { type: Boolean, default: true },
});

const OTEquipment = mongoose.model('OTEquipment', otEquipmentSchema);

module.exports = OTEquipment;
