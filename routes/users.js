const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

 
// User registration route
router.post('/register',authenticateToken,UserController.register);

// User login route
router.post('/login',UserController.login);

// Route to get all users
router.get('/users', authenticateToken, UserController.getAllUsers);


module.exports = router;
