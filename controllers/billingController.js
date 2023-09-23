const Billing = require("../models/Billing");
const easyinvoice = require("easyinvoice");

// Create a new billing record
exports.createBillingRecord = async (req, res) => {
  try {
    const billingData = req.body; // Get all billing data from the request body

    const billing = new Billing(billingData);

    // Save the billing record to the database
    await billing.save();

    return res.status(201).json(billing);
  } catch (error) {
    console.error("Error creating billing record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all billing records
exports.getAllBillingRecords = async (req, res) => {
  try {
    const billingRecords = await Billing.find({});

    return res.status(200).json(billingRecords);
  } catch (error) {
    console.error("Error getting billing records:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single billing record by ID
exports.getBillingRecordById = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id);

    if (!billingRecord) {
      return res.status(404).json({ error: "Billing record not found" });
    }

    return res.status(200).json(billingRecord);
  } catch (error) {
    console.error("Error getting billing record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single billing record by Patient ID
exports.getBillingRecordByPatientId = async (req, res) => {
  try {
    const billingRecord = await Billing.findOne({ patient: req.params.id });

    if (!billingRecord) {
      return res.status(404).json({ error: "Billing record not found" });
    }

    return res.status(200).json(billingRecord);
  } catch (error) {
    console.error("Error getting billing record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a billing record
exports.updateBillingRecord = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id);

    if (!billingRecord) {
      return res.status(404).json({ error: "Billing record not found" });
    }

    // Update the billing record with the new data from the request body
    Object.assign(billingRecord, req.body);

    // Save the updated billing record to the database
    await billingRecord.save();

    return res.status(200).json(billingRecord);
  } catch (error) {
    console.error("Error updating billing record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a billing record by Patient ID
exports.updateBillingRecordByPatientId = async (req, res) => {
  try {
    const billingRecord = await Billing.findOne({ patient: req.params.id });

    if (!billingRecord) {
      return res.status(404).json({ error: "Billing record not found" });
    }

    // Append new services to the existing services array
    if (req.body.services && req.body.services.length > 0) {
      billingRecord.services.push(...req.body.services);
    }

    // Update the billing record with the new data from the request body
    Object.assign(billingRecord, req.body);

    // Save the updated billing record to the database
    await billingRecord.save();

    return res.status(200).json(billingRecord);
  } catch (error) {
    console.error("Error updating billing record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a billing record
exports.deleteBillingRecord = async (req, res) => {
  try {
    const billingRecord = await Billing.findById(req.params.id);

    if (!billingRecord) {
      return res.status(404).json({ error: "Billing record not found" });
    }

    // Delete the billing record from the database
    await billingRecord.remove();

    return res.status(200).json({ message: "Billing record deleted" });
  } catch (error) {
    console.error("Error deleting billing record:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all billing records for a patient
exports.getAllBillingRecordsForPatient = async (req, res) => {
  try {
    const billingRecords = await Billing.find({ patient: req.params.id });

    return res.status(200).json(billingRecords);
  } catch (error) {
    console.error("Error getting billing records:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all billing records for a ward
exports.getAllBillingRecordsForWard = async (req, res) => {
  try {
    const billingRecords = await Billing.find({ ward: req.params.id });

    return res.status(200).json(billingRecords);
  } catch (error) {
    console.error("Error getting billing records:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all billing records for a doctor
exports.getAllBillingRecordsForDoctor = async (req, res) => {
  try {
    const billingRecords = await Billing.find({ doctor: req.params.id });

    return res.status(200).json(billingRecords);
  } catch (error) {
    console.error("Error getting billing records:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.generateInvoice = async (req, res) => {
  try {
    // Extract invoice data from the request or your database
    const { invoiceDetails, selectedPatientDetails, hospitals } = req.body;

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 15);

    const formattedDate = currentDate.toISOString().slice(0, 10);

    // Define data for the invoice (in the format expected by easyinvoice)
    const data = {
      documentTitle: "INVOICE",
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "your_logo_url", // URL to your company logo (optional)
      sender: {
        company: hospitals.hospital_name,
        address: hospitals.address,
        country: "India",
      },
      client: {
        company: `${selectedPatientDetails.firstName} ${selectedPatientDetails.lastName}`,
        country: "India",
      },
      information: {
        number: "2021.0001",
        date: new Date().toISOString().slice(0, 10),
        "due-date": formattedDate,
      },
      products: [], // Initialize an empty array for products
      "bottom-notice": "Powered by Medisys",
      settings: {
        currency: "INR",
        "margin-top": 25,
        "margin-right": 25,
        "margin-left": 25,
        "margin-bottom": 25,
        format: "A4",
        height: "1000px",
        width: "500px",
        "tax-notation": "GST",
      },
    };

    // Calculate registration fees separately
    const registrationFee = invoiceDetails.registrationFee;

    // Add registration fees to the products array
    data.products.push({
      quantity: 1,
      description: "Registration Fee",
      "tax-rate": 18, // 18% GST (adjust as needed)
      price: registrationFee,
    });

     // Calculate Room Charges separately
    const roomCharges = invoiceDetails.roomCharges;

    // Add Room Charges to the products array
    if (roomCharges > 0){
    data.products.push({
      quantity: 1,
      description: "Room Charges",
      "tax-rate": 18, // 18% GST (adjust as needed)
      price: roomCharges,
    });
    }

    // Add other services to the products array
    invoiceDetails.services.forEach((service) => {
      data.products.push({
        quantity: 1,
        description: service.serviceName,
        "tax-rate": 18, // 18% GST (adjust as needed)
        price: service.serviceCharge,
      });
    });

    // Calculate total based on the services and registration fees
    const total = data.products.reduce(
      (acc, product) => acc + product.price,
      0
    );

    // Add the total to the invoice
    data.total = {
      label: "Total",
      price: total,
    };

    // Generate the invoice
    await easyinvoice.createInvoice(data, (result) => {
      // Send the generated invoice as a response
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=invoice.pdf"
      );
      res.send(Buffer.from(result.pdf, "base64"));
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).json({ error: "Error generating invoice" });
  }
};

exports.printInvoice = async (req, res) => {
  try {
    // Extract invoice data from the request or your database
    const { invoiceDetails, selectedPatientDetails, hospitals } = req.body;

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 15);

    const formattedDate = currentDate.toISOString().slice(0, 10);

    // Define data for the invoice (in the format expected by easyinvoice)
    const data = {
      documentTitle: "INVOICE",
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: "your_logo_url", // URL to your company logo (optional)
      sender: {
        company: hospitals.hospital_name,
        address: hospitals.address,
        country: "India",
      },
      client: {
        company: `${selectedPatientDetails.firstName} ${selectedPatientDetails.lastName}`,
        country: "India",
      },
      information: {
        number: "2021.0001",
        date: new Date().toISOString().slice(0, 10),
        "due-date": formattedDate,
      },
      products: [], // Initialize an empty array for products
      "bottom-notice": "Powered by Medisys",
      settings: {
        currency: "INR",
        "margin-top": 25,
        "margin-right": 25,
        "margin-left": 25,
        "margin-bottom": 25,
        format: "A4",
        height: "1000px",
        width: "500px",
        "tax-notation": "GST",
      },
    };

    // Calculate registration fees separately
    const registrationFee = invoiceDetails.registrationFee;

    // Add registration fees to the products array
    data.products.push({
      quantity: 1,
      description: "Registration Fee",
      "tax-rate": 18, // 18% GST (adjust as needed)
      price: registrationFee,
    });

    // Calculate Room Charges separately
    const roomCharges = invoiceDetails.roomCharges;

    // Add Room Charges to the products array
    if (roomCharges > 0){
    data.products.push({
      quantity: 1,
      description: "Room Charges",
      "tax-rate": 18, // 18% GST (adjust as needed)
      price: roomCharges,
    });
    }

    // Add other services to the products array
    invoiceDetails.services.forEach((service) => {
      data.products.push({
        quantity: 1,
        description: service.serviceName,
        "tax-rate": 18, // 18% GST (adjust as needed)
        price: service.serviceCharge,
      });
    });

    // Calculate total based on the services and registration fees
    const total = data.products.reduce(
      (acc, product) => acc + product.price,
      0
    );

    // Add the total to the invoice
    data.total = {
      label: "Total",
      price: total,
    };

    // Generate the invoice
    await easyinvoice.createInvoice(data, (result) => {
      // Send the generated invoice as a response
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=invoice.pdf"
      );
      res.send(Buffer.from(result.pdf, "base64"));
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).json({ error: "Error generating invoice" });
  }
};



