const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');
const authenticateToken = require('../middleware/authMiddleware');

// Get admission/discharge/transfer statistics
router.get('/api/admission', authenticateToken,admissionController.getAdmissionStatistics);

// Create a new admission record
router.post('/api/admission', authenticateToken,admissionController.createAdmission);

// Update an admission record
router.patch('/api/admission/update', authenticateToken,admissionController.updateAdmission);

module.exports = router;
