const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report');

// Route to get all reports
router.get('/reports', reportController.getAllReports);

// Route to create a new report
router.post('/reports', reportController.createReport);

// Route to get a specific report by id
router.get('/reports/:id', reportController.getReportById);

// Route to update a report by id
router.patch('/reports/:id', reportController.updateReportById);

// Route to delete a report by id
router.delete('/reports/:id', reportController.deleteReportById);

module.exports = router;
