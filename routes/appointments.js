const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/api/appointment', authenticateToken,appointmentsController.getAllAppointments);
router.post('/api/appointment', authenticateToken,appointmentsController.createAppointment);
router.get('/date-range', authenticateToken,appointmentsController.getAppointmentsByDateRange);

router.patch('/:id/status', authenticateToken,appointmentsController.updateAppointmentStatus);

module.exports = router;
