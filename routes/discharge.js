const express = require('express');
const router = express.Router();
const dischargeController = require('../controllers/dischargeController'); // Adjust the path as needed

// Create a new discharge record
router.post('/discharge', dischargeController.createDischarge);

// Get a list of all discharge records
router.get('/discharge', dischargeController.getAllDischarges);

// Get a single discharge record by ID
router.get('/discharge/:id', dischargeController.getDischargeById);

// Update a discharge record by ID
router.put('/discharge/:id', dischargeController.updateDischargeById);

// Delete a discharge record by ID
router.delete('/discharge/:id', dischargeController.deleteDischargeById);

// Generate discharge summary
router.post('/discharge/summary', dischargeController.generateDischargeSummary);

module.exports = router;
