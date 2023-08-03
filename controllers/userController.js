const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Hospital = require('../models/hospital');

// Function to check if a hospital has no users
async function isHospitalEmpty(hospitalId) {
  try {
    const userCount = await User.countDocuments({ hospital: hospitalId });
    return userCount === 0;
  } catch (error) {
    console.error('Error checking hospital users:', error);
    return false;
  }
}

// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
}

// User registration
exports.registerUser = async (req, res) => {
  const {     
    hospital_id,
    username,
    password,
    full_name,
    date_of_birth,
    gender,
    address,
    phone,
    email, } = req.body;


  try {
    
    
    // Check if the hospital exists
    const hospital = await Hospital.findOne({ hospitalId });
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Check if the hospital has no users
    const hospitalIsEmpty = await isHospitalEmpty(hospital._id);

    // If the hospital has no users, set the role to "admin" for the initial user
    const role = hospitalIsEmpty ? 'admin' : req.body.role;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    

    const newUser = await User.create({
        hospital_id,
        username,
        password: hashedPassword,
        role,
        full_name,
        date_of_birth,
        gender,
        address,
        phone,
        email,
    });

    // Check if the username and email are already in use
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Generate and return the JWT token upon successful registration
    const token = generateToken(newUser);
    return res.status(201).json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user' });
  }
};

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate and return the JWT token upon successful login
      const token = generateToken(user);
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Error logging in' });
    }
  };

// User logout
exports.logoutUser = async (req, res) => {
    try {
      // Clear the JWT token on the client-side (e.g., by removing it from local storage or cookies)
      // For example, in a React application, you can clear the token from local storage as follows:
      localStorage.removeItem('accessToken');
  
      // You can also clear the token from cookies if you're using cookies for storing the token:
      // res.clearCookie('accessToken');
  
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out:', error);
      return res.status(500).json({ message: 'Error logging out' });
    }
  };
  