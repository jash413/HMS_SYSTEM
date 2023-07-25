const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route to get all appointments
router.get('/appointments', appointmentController.getAllAppointments);

// Route to create a new appointment
router.post('/appointments', appointmentController.createAppointment);

// Route to get a specific appointment by id
router.get('/appointments/:id', appointmentController.getAppointmentById);

// Route to update an appointment by id
router.patch('/appointments/:id', appointmentController.updateAppointmentById);

// Route to delete an appointment by id
router.delete('/appointments/:id', appointmentController.deleteAppointmentById);

module.exports = router;
