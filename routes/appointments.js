const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentController');

router.get('/docapc', appointmentsController.getAllAppointments);
router.post('/docapc', appointmentsController.createAppointment);
router.get('/date-range', appointmentsController.getAppointmentsByDateRange);

router.patch('/:id/status', appointmentsController.updateAppointmentStatus);

module.exports = router;
