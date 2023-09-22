const express = require('express');
const router = express.Router();
const operationTheatreController = require('../controllers/operationTheatreController');
const authenticateToken = require('../middleware/authMiddleware');

// Get all available resources
router.get('/available-resources', authenticateToken,operationTheatreController.getAvailableResources);

// Create, read, and update routes for Operation Theatres
router.post('/operation-theatres', authenticateToken,operationTheatreController.createOperationTheatre);
router.get('/operation-theatres', authenticateToken,operationTheatreController.getOperationTheatres);
router.get('/operation-theatres/:id', authenticateToken,operationTheatreController.getOperationTheatreById);
router.patch('/operation-theatres/:id', authenticateToken,operationTheatreController.updateOperationTheatre);

// Create, read, and update routes for Anaesthetists
router.post('/anaesthetists', authenticateToken,operationTheatreController.createAnaesthetist);
router.get('/anaesthetists', authenticateToken,operationTheatreController.getAnaesthetists);
router.get('/anaesthetists/:id', authenticateToken,operationTheatreController.getAnaesthetistById);
router.patch('/anaesthetists/:id', authenticateToken,operationTheatreController.updateAnaesthetist);

// Create, read, and update routes for OT Equipments
router.post('/ot-equipments', authenticateToken,operationTheatreController.createOTEquipment);
router.get('/ot-equipments', authenticateToken,operationTheatreController.getOTEquipments);
router.patch('/ot-equipments/:id', authenticateToken,operationTheatreController.updateOTEquipment);

// Create, read, and update routes for OT Kits
router.post('/ot-kits', authenticateToken,operationTheatreController.createOTkit);
router.get('/ot-kits', authenticateToken,operationTheatreController.getOTkit);
router.get('/ot-kits/:id', authenticateToken,operationTheatreController.getOTkitById);
router.patch('/ot-kits/:id', authenticateToken,operationTheatreController.updateOTkit);

// Create, read, and update routes for Surgery Schedules
router.post('/surgeries', authenticateToken,operationTheatreController.createSurgery);
router.get('/surgeries', authenticateToken,operationTheatreController.getAllSurgeries);
router.get('/surgeries/search', authenticateToken,operationTheatreController.getSurgeryBySearch);
router.get('/surgeries/:id', authenticateToken,operationTheatreController.getSurgeryById);
router.get('/surgeries/:id', authenticateToken,operationTheatreController.getSurgeryById);
router.patch('/surgeries/:id', authenticateToken,operationTheatreController.updateSurgery);
router.delete('/surgeries/:id', authenticateToken,operationTheatreController.deleteSurgery);


// Create, read, and update routes for Surgery Records
router.post('/surgery-records', authenticateToken,operationTheatreController.createSurgeryRecord);
router.get('/surgery-records', authenticateToken,operationTheatreController.getSurgeryRecords);
router.get('/surgery-records/search', authenticateToken,operationTheatreController.getSurgeryRecordsBySurgeryId)
router.get('/surgery-records/:id', authenticateToken,operationTheatreController.getSurgeryRecordById);
router.patch('/surgery-records/update', authenticateToken,operationTheatreController.updateSurgeryRecordBySurgeryId)
router.patch('/surgery-records/:id', authenticateToken,operationTheatreController.updateSurgeryRecord);
router.delete('/surgery-records/:id', authenticateToken,operationTheatreController.deleteSurgeryRecord);

// Generate Consent Form
router.post('/generate-consent-form', authenticateToken,operationTheatreController.generateConsentForm);

// Get Common Available Slots
router.get('/common-available-slots', authenticateToken,operationTheatreController.getCommonAvailableSlots);

module.exports = router;
