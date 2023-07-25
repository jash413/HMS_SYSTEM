const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billing');

// Route to get all billing records
router.get('/billing', billingController.getAllBillingRecords);

// Route to create a new billing record
router.post('/billing', billingController.createBillingRecord);

// Route to get a specific billing record by id
router.get('/billing/:id', billingController.getBillingRecordById);

// Route to update a billing record by id
router.patch('/billing/:id', billingController.updateBillingRecordById);

// Route to delete a billing record by id
router.delete('/billing/:id', billingController.deleteBillingRecordById);

module.exports = router;
