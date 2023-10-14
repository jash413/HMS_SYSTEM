const express = require('express');
const router = express.Router();
const wardController = require('../controllers/wardController');
const authenticateToken = require('../middleware/authMiddleware');

// Routes for wards
router.get('/api/ward', authenticateToken,wardController.getAllWards);
// Get ward by wardNumber
router.get('/api/ward/:wardNumber', wardController.getWardByNumber);
// Get ward by id
router.get('/api/ward/id/:id', wardController.getWardById);
// Update the status of a ward by wardNumber
router.patch('/api/ward/:wardNumber',wardController.updateWardStatus);
router.get('/:wardNumber', authenticateToken,wardController.getWardByNumber);
router.post('/api/ward', authenticateToken,wardController.createWard);
router.put('/:wardNumber', authenticateToken,wardController.updateWard);
router.delete('/api/ward', authenticateToken,wardController.deleteWard);

module.exports = router;
 