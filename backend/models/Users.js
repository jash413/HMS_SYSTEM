const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('./db');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Doctor', 'Nurse', 'Admin'],
    required: true,
  },
  permissions: {
    type: [String],
    default: [],
  },
});

// Define a method to validate a user's password
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
