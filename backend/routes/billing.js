const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const authenticateToken = require('../middleware/authMiddleware');

 
// Create a new billing record
router.post('/billing', billingController.createBillingRecord);

// Get all billing records
router.get('/billing', billingController.getAllBillingRecords);

// Get a single billing record by ID
router.get('/billing/:id', billingController.getBillingRecordById);

// Get a single billing record by Patient ID
router.get('/billing/patient/:id', billingController.getBillingRecordByPatientId);

// Update a billing record
router.patch('/billing/:id', billingController.updateBillingRecord);

// Update a billing record by Patient ID
router.patch('/billing/patient/:id', billingController.updateBillingRecordByPatientId);

// Delete a billing record
router.delete('/billing/:id', billingController.deleteBillingRecord);

// Generate Invoice
router.post('/billing/generateInvoice', billingController.generateInvoice);

// Print Invoice
router.post('/billing/printInvoice', billingController.printInvoice);

module.exports = router;