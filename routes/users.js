const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const passport = require('passport');
// const passportConfig = require('../config/passport'); // Passport.js configuration file

// User registration route
router.post('/register', UserController.register);

// User login route
router.post('/login', UserController.login);

// Route to send OTP via SMS
router.post("/send-otp", UserController.sendOTPSMS);

module.exports = router;
