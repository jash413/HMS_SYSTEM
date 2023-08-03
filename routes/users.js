const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/api/register', userController.registerUser);

// User login
router.post('/api/login', userController.loginUser);

// User logout
router.post('/api/logout', userController.logoutUser);

module.exports = router;

