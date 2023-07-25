const mongoose = require('mongoose');
const db = require('./db');

// Define the User schema
const userSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
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
  role: {
    type: String,
    enum: ['admin', 'doctor', 'nurse', 'staff'],
    default: 'staff',
  },
  full_name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
