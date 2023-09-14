const passport = require('../middleware/passport');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Import your user model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Function to handle user registration
exports.register = async (req, res) => {
  try {
    const { hospital_id ,name ,username, password, email, role, permissions } = req.body;

    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use.' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password and permissions
    const newUser = new User({ hospital_id,name ,username, password: hashedPassword, email, role, permissions });
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

// Function to handle protected routes (verify JWT token)
exports.protectedRoute = (req, res) => {
  // If the request reaches this point, it means the JWT token has been verified
  // You can access user information, including permissions, from req.user
  return res.status(200).json({ message: 'Protected route accessed successfully', user: req.user });
};
