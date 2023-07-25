const express = require('express');
const router = express.Router();
const ehrController = require('../controllers/ehr');

// Route to get all EHR records
router.get('/ehr', ehrController.getAllEHRRecords);

// Route to create a new EHR record
router.post('/ehr', ehrController.createEHRRecord);

// Route to get a specific EHR record by id
router.get('/ehr/:id', ehrController.getEHRRecordById);

// Route to update an EHR record by id
router.patch('/ehr/:id', ehrController.updateEHRRecordById);

// Route to delete an EHR record by id
router.delete('/ehr/:id', ehrController.deleteEHRRecordById);

module.exports = router;
