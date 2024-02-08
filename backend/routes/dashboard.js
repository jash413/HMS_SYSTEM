const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Get hospitality status
router.post('/dashboard/hospitalityStatus', dashboardController.getHospitalityStatus);

module.exports = router;