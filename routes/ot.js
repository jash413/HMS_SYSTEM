const express = require('express');
const router = express.Router();
const operationTheatreController = require('../controllers/operationTheatreController');

// Get all available resources
router.get('/available-resources', operationTheatreController.getAvailableResources);

// Create, read, and update routes for Operation Theatres
router.post('/operation-theatres', operationTheatreController.createOperationTheatre);
router.get('/operation-theatres', operationTheatreController.getOperationTheatres);
router.patch('/operation-theatres/:id', operationTheatreController.updateOperationTheatre);

// Create, read, and update routes for Anaesthetists
router.post('/anaesthetists', operationTheatreController.createAnaesthetist);
router.get('/anaesthetists', operationTheatreController.getAnaesthetists);
router.patch('/anaesthetists/:id', operationTheatreController.updateAnaesthetist);

// Create, read, and update routes for OT Equipments
router.post('/ot-equipments', operationTheatreController.createOTEquipment);
router.get('/ot-equipments', operationTheatreController.getOTEquipments);
router.patch('/ot-equipments/:id', operationTheatreController.updateOTEquipment);

// Create, read, and update routes for Consent Forms
router.post('/consent-forms', operationTheatreController.createConsentForm);
router.get('/consent-forms', operationTheatreController.getConsentForms);
router.patch('/consent-forms/:id', operationTheatreController.updateConsentForm);

// Create, read, and update routes for Surgery Records
router.post('/surgery-records', operationTheatreController.createSurgeryRecord);
router.get('/surgery-records', operationTheatreController.getSurgeryRecords);
router.patch('/surgery-records/:id', operationTheatreController.updateSurgeryRecord);

module.exports = router;
