const express = require('express');
const router = express.Router();
const wardController = require('../controllers/wardController');

// Routes for wards
router.get('/api/ward', wardController.getAllWards);
// Update the status of a ward by wardNumber
router.patch('/api/ward/:wardNumber', wardController.updateWardStatus);
router.get('/:wardNumber', wardController.getWardByNumber);
router.post('/api/ward', wardController.createWard);
router.put('/:wardNumber', wardController.updateWard);
router.delete('/:wardNumber', wardController.deleteWard);

module.exports = router;
