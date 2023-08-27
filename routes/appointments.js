const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentController');

router.get('/api/ap', appointmentsController.getAllAppointments);
router.post('/api/ap', appointmentsController.createAppointment);
router.get('/date-range', appointmentsController.getAppointmentsByDateRange);

router.patch('/:id/status', appointmentsController.updateAppointmentStatus);

module.exports = router;
