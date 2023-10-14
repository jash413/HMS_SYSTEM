const { Int32 } = require('bson');
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  is_discontinued: {
    type: Boolean,
    default: false,
  },
  manufacturer_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['allopathy', 'homeopathy', 'ayurveda', 'other'],
    required: true,
  },
  pack_size_label: {
    type: String,
    required: true,
  },
  short_composition1: {
    type: String,
    required: true,
  },
  short_composition2: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  }
});

const Medicine = mongoose.model('Medicines', medicineSchema);

module.exports = Medicine;
