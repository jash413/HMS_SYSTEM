const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentController');

router.get('/api/appointment', appointmentsController.getAllAppointments);
router.post('/api/appointment', appointmentsController.createAppointment);
router.get('/date-range', appointmentsController.getAppointmentsByDateRange);

router.patch('/:id/status', appointmentsController.updateAppointmentStatus);

module.exports = router;
