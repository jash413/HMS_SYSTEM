const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authenticateToken = require('../middleware/authMiddleware');

// Route to get all patients
router.get('/api/patients', authenticateToken,patientController.getAllPatients);

// GET /api/patients/search endpoint for searching patients
router.get('/api/patients/search', authenticateToken,patientController.searchPatients);


// Route to create a new patient
router.post('/api/patients', authenticateToken,patientController.createPatient);

// Route to get a specific patient by id
router.get('/api/patients/:id', authenticateToken,patientController.getPatientById);

// Route to update a patient by id
router.patch('/api/patients/:id', authenticateToken,patientController.updatePatient);

// Route to delete a patient by id
router.delete('/api/patients/:id', authenticateToken,patientController.deletePatient);


module.exports = router;
