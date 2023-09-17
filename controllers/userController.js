const passport = require('../middleware/passport');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Import your user model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const twilio = require("twilio");

// Initialize Twilio client with your credentials
const accountSid = "ACbbaa2a14b8f333557ce6bf12d147bae4";
const authToken = "e20b74904da96c249a8f01a68df3de96";
const twilioPhoneNumber = "+18184939912";

const client = twilio(accountSid, authToken);

// Function to handle user registration
exports.register = async (req, res) => {
  try {
    const { hospital_id ,doctor_id ,name ,username, password, email, role, permissions } = req.body;

    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use.' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password and permissions
    const newUser = new User({ hospital_id,doctor_id ,name ,username, password: hashedPassword, email, role, permissions });
    await newUser.save();

    return res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Function to handle user login and generate JWT token
exports.login = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password' } );
    }

    // If authentication is successful, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role, permissions: user.permissions },
      'medisys1234',
      { expiresIn: '1h' } // Token expiration time (adjust as needed)
    );

    // Return the token and user information
    return res.status(200).json({ token, user });
  })(req, res);
};

// Function to send OTP via SMS
exports.sendOTPSMS = async (req, res) => {
  try {
    // Generate a random OTP (you can use any OTP generation library)
    const otp = generateRandomOTP(); // Implement your own OTP generation logic

    // User's phone number to send the OTP
    const phoneNumber = req.body.phoneNumber; // Assuming you receive the phone number in the request body

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

// Function to generate a random OTP (example)
function generateRandomOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

