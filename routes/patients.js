const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Route to get all patients
router.get('/api/patients', patientController.getAllPatients);

// Route to create a new patient
router.post('/api/patients', patientController.createPatient);

// Route to get a specific patient by id
router.get('/api/patients/:id', patientController.getPatientById);

// Route to update a patient by id
router.patch('/api/patients/:id', patientController.updatePatient);

// Route to delete a patient by id
router.delete('/api/patients/:id', patientController.deletePatient);

module.exports = router;
