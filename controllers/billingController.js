const e = require('cors');
const Billing = require('../models/Billing');


// Create a new billing record
exports.createBillingRecord = async (req, res) => {
  try {
    const billingData = req.body; // Get all billing data from the request body

    const billing = new Billing(billingData);

    // Save the billing record to the database
    await billing.save();

    return res.status(201).json(billing);
  } catch (error) {
    console.error('Error creating billing record:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all billing records
exports.getAllBillingRecords = async (req, res) => {
  try {
    const billingRecords = await Billing.find({});

    return res.status(200).json(billingRecords);
  } catch (error) {
    console.error('Error getting billing records:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single billing record by ID
exports.getBillingRecordById = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id);

    if (!billingRecord) {
      return res.status(404).json({ error: 'Billing record not found' });
    }

    return res.status(200).json(billingRecord);
  } catch (error) {
    console.error('Error getting billing record:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single billing record by Patient ID
exports.getBillingRecordByPatientId = async (req, res) => {
  try {
    const billingRecord = await Billing.findOne({patient: req.params.id});

    if (!billingRecord) {
      return res.status(404).json({ error: 'Billing record not found' });
    }

    return res.status(200).json(billingRecord);
  } catch (error) {
    console.error('Error getting billing record:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Update a billing record
exports.updateBillingRecord = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id);

    if (!billingRecord) {
      return res.status(404).json({ error: 'Billing record not found' });
    }

    // Update the billing record with the new data from the request body
    Object.assign(billingRecord, req.body);

    // Save the updated billing record to the database
    await billingRecord.save();

    return res.status(200).json(billingRecord);
  } catch (error) {
    console.error('Error updating billing record:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a billing record by Patient ID
exports.updateBillingRecordByPatientId = async (req, res) => {
  try {
    const billingRecord = await Billing.findOne({patient: req.params.id});

    if (!billingRecord) {
      return res.status(404).json({ error: 'Billing record not found' });
    }

     // Append new services to the existing services array
     if (req.body.services && req.body.services.length > 0) {
      billingRecord.services.push(...req.body.services);
    }


    // Save the updated billing record to the database
    await billingRecord.save();

    return res.status(200).json(billingRecord);
  } catch (error) {
    console.error('Error updating billing record:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a billing record
exports.deleteBillingRecord = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id);

    if (!billingRecord) {
      return res.status(404).json({ error: 'Billing record not found' });
    }

    // Delete the billing record from the database
    await billingRecord.remove();

    return res.status(200).json({ message: 'Billing record deleted' });
  } catch (error) {
    console.error('Error deleting billing record:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all billing records for a patient
exports.getAllBillingRecordsForPatient = async (req, res) => {
  try {
    const billingRecords = await Billing.find({ patient: req.params.id });

    return res.status(200).json(billingRecords);
  } catch (error) {
    console.error('Error getting billing records:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all billing records for a ward
exports.getAllBillingRecordsForWard = async (req, res) => {
  try {
    const billingRecords = await Billing.find({ ward: req.params.id });

    return res.status(200).json(billingRecords);
  } catch (error) {
    console.error('Error getting billing records:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all billing records for a doctor
exports.getAllBillingRecordsForDoctor = async (req, res) => {
  try {
    const billingRecords = await Billing.find({ doctor: req.params.id });

    return res.status(200).json(billingRecords);
  } catch (error) {
    console.error('Error getting billing records:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




