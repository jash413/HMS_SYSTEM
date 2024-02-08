const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController'); // Adjust the path as needed

// Route for PDF extraction
router.post('/api/extract', pdfController.extractPdfData);

module.exports = router;
