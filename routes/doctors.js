const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor');

// Route to get all doctors
router.get('/doctors', doctorController.getAllDoctors);

// Route to create a new doctor
router.post('/doctors', doctorController.createDoctor);

// Route to get a specific doctor by id
router.get('/doctors/:id', doctorController.getDoctorById);

// Route to update a doctor by id
router.patch('/doctors/:id', doctorController.updateDoctorById);

// Route to delete a doctor by id
router.delete('/doctors/:id', doctorController.deleteDoctorById);

module.exports = router;
