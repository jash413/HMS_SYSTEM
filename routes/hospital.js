const express = require('express');
const router = express.Router();
const HospitalController = require('../controllers/hospitalController'); // Import your hospital controller
require('dotenv').config();

// Middleware to check the API key
const checkApiKey = (req, res, next) => {
  const providedApiKey = req.query.api_key;
  const expectedApiKey = process.env.API_KEY; // Replace with your actual API key
  
  if (providedApiKey === expectedApiKey) {
    next(); // API key is valid, proceed to the next middleware/route handler
  } else {
    res.status(403).json({ message: 'Access denied. Invalid API key.' });
  }
};

// Apply the API key middleware to the entire router
router.use(checkApiKey);

// Routes for hospitals
router.get('/api/hospital', HospitalController.getAllHospitals);
router.get('/api/hospital/:id', HospitalController.getHospitalById);
router.post('/api/hospital', HospitalController.createHospital);
router.put('/api/hospital/:id', HospitalController.updateHospital);
router.delete('/api/hospital/:id', HospitalController.deleteHospital);

// Export the router
module.exports = router;
