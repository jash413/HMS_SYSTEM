const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authenticateToken = require('../middleware/authMiddleware');

// Route to get all staff members
router.get('/api/staff', authenticateToken,staffController.getAllStaff);

// Route to create a new staff member
router.post('/api/staff', staffController.createStaff);

// Route to get a specific staff member by id
router.get('/staff/:id', authenticateToken, staffController.getStaffById);

// Route to update a staff member by id
router.patch('/staff/:id', authenticateToken, staffController.updateStaffById);

// Route to delete a staff member by id
router.delete('/staff/:id', authenticateToken, staffController.deleteStaffById);

module.exports = router;
