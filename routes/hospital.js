const express = require('express');
const router = express.Router();
const HospitalController = require('../controllers/hospitalController'); // Import your hospital controller

// Routes for hospitals
router.get('/api/hospital', HospitalController.getAllHospitals);
router.get('/api/hospital/:id', HospitalController.getHospitalById);
router.post('/api/hospital', HospitalController.createHospital);
router.put('/api/hospital/:id', HospitalController.updateHospital);
router.delete('/api/hospital/:id', HospitalController.deleteHospital);

// Export the router
module.exports = router;
