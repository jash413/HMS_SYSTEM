const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const passport = require('passport');
// const passportConfig = require('../config/passport'); // Passport.js configuration file

// User registration route
router.post('/register', UserController.register);

// User login route
router.post('/login', UserController.login);

// Protected route (requires JWT token)
router.get('/protected', passport.authenticate('jwt', { session: false }), UserController.protectedRoute);

module.exports = router;
