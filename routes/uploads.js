const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload');

// Route to handle file uploads
router.post('/uploads', uploadController.uploadFile);

module.exports = router;
