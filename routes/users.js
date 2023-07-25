const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Route to get all users
router.get('/users', userController.getAllUsers);

// Route to create a new user
router.post('/users', userController.createUser);

// Route to get a specific user by id
router.get('/users/:id', userController.getUserById);

// Route to update a user by id
router.patch('/users/:id', userController.updateUserById);

// Route to delete a user by id
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
