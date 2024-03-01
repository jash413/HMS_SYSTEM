const mongoose = require('mongoose');
const db = require('./db');

const patientSchema = new mongoose.Schema({
    hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  patient_id: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  admitDate: {
    type: Date,
  },
  admitTime: {
    type: String,
  },
  dischargeDate: {
    type: Date,
  },
  dischargeTime: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER'],
  },
  addNote: {
    type: String,
  },
  paymentOption: {
    type: String,
  },
  insuranceInformation: {
    type: String,
  },
  insuranceNumber: {
    type: String,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  admitted: {
    type: Boolean,
    default: false,
  },
  ward: {
    type: String,
    default: null,
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
