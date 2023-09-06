const express = require('express');
const router = express.Router();
const operationTheatreController = require('../controllers/operationTheatreController');

// Get all available resources
router.get('/available-resources', operationTheatreController.getAvailableResources);

// Create, read, and update routes for Operation Theatres
router.post('/operation-theatres', operationTheatreController.createOperationTheatre);
router.get('/operation-theatres', operationTheatreController.getOperationTheatres);
router.get('/operation-theatres/:id', operationTheatreController.getOperationTheatreById);
router.patch('/operation-theatres/:id', operationTheatreController.updateOperationTheatre);

// Create, read, and update routes for Anaesthetists
router.post('/anaesthetists', operationTheatreController.createAnaesthetist);
router.get('/anaesthetists', operationTheatreController.getAnaesthetists);
router.get('/anaesthetists/:id', operationTheatreController.getAnaesthetistById);
router.patch('/anaesthetists/:id', operationTheatreController.updateAnaesthetist);

// Create, read, and update routes for OT Equipments
router.post('/ot-equipments', operationTheatreController.createOTEquipment);
router.get('/ot-equipments', operationTheatreController.getOTEquipments);
router.patch('/ot-equipments/:id', operationTheatreController.updateOTEquipment);

// Create, read, and update routes for OT Kits
router.post('/ot-kits', operationTheatreController.createOTkit);
router.get('/ot-kits', operationTheatreController.getOTkit);
router.get('/ot-kits/:id', operationTheatreController.getOTkitById);
router.patch('/ot-kits/:id', operationTheatreController.updateOTkit);

// Create, read, and update routes for Surgery Schedules
router.post('/surgeries', operationTheatreController.createSurgery);
router.get('/surgeries', operationTheatreController.getAllSurgeries);
router.get('/surgeries/search', operationTheatreController.getSurgeryBySearch);
router.get('/surgeries/:id', operationTheatreController.getSurgeryById);
router.get('/surgeries/:id', operationTheatreController.getSurgeryById);
router.patch('/surgeries/:id', operationTheatreController.updateSurgery);
router.delete('/surgeries/:id', operationTheatreController.deleteSurgery);


// Create, read, and update routes for Surgery Records
router.post('/surgery-records', operationTheatreController.createSurgeryRecord);
router.get('/surgery-records', operationTheatreController.getSurgeryRecords);
router.patch('/surgery-records/:id', operationTheatreController.updateSurgeryRecord);
router.delete('/surgery-records/:id', operationTheatreController.deleteSurgeryRecord);

// Generate Consent Form
router.post('/generate-consent-form', operationTheatreController.generateConsentForm);

// Get Common Available Slots
router.get('/common-available-slots', operationTheatreController.getCommonAvailableSlots);

module.exports = router;
