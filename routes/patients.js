const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient');

// Route to get all patients
router.get('/patients', patientController.getAllPatients);

// Route to create a new patient
router.post('/patients', patientController.createPatient);

// Route to get a specific patient by id
router.get('/patients/:id', patientController.getPatientById);

// Route to update a patient by id
router.patch('/patients/:id', patientController.updatePatientById);

// Route to delete a patient by id
router.delete('/patients/:id', patientController.deletePatientById);

module.exports = router;
