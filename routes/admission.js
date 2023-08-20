const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');

// Get admission/discharge/transfer statistics
router.get('/api/admission', admissionController.getAdmissionStatistics);

// Create a new admission record
router.post('/api/admission', admissionController.createAdmission);

// Update an admission record
router.patch('/api/admission/update', admissionController.updateAdmission);

module.exports = router;
