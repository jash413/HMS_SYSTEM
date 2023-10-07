const Discharge = require('../models/Discharge'); // Assuming this is the path to your model
const Patient = require('../models/Patients'); 
const Doctor = require('../models/Doctors');
const PDFDocument = require("pdfkit");

// Create a new discharge record
exports.createDischarge = async (req, res) => {
  try {
    const newDischarge = new Discharge(req.body);
    const savedDischarge = await newDischarge.save();
    res.status(201).json(savedDischarge);
  } catch (error) {
    console.error('Error creating discharge record:', error);
    res.status(500).json({ error: 'Failed to create discharge record' });
  }
};

// Get a list of all discharge records
exports.getAllDischarges = async (req, res) => {
  try {
    const discharges = await Discharge.find();
    res.json(discharges);
  } catch (error) {
    console.error('Error getting discharge records:', error);
    res.status(500).json({ error: 'Failed to get discharge records' });
  }
};

// Get a single discharge record by ID
exports.getDischargeById = async (req, res) => {
  const { id } = req.params;
  try {
    const discharge = await Discharge.findById(id);
    if (!discharge) {
      return res.status(404).json({ error: 'Discharge record not found' });
    }
    res.json(discharge);
  } catch (error) {
    console.error('Error getting discharge record by ID:', error);
    res.status(500).json({ error: 'Failed to get discharge record' });
  }
};

// Update a discharge record by ID
exports.updateDischargeById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDischarge = await Discharge.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDischarge) {
      return res.status(404).json({ error: 'Discharge record not found' });
    }
    res.json(updatedDischarge);
  } catch (error) {
    console.error('Error updating discharge record by ID:', error);
    res.status(500).json({ error: 'Failed to update discharge record' });
  }
};

// Delete a discharge record by ID
exports.deleteDischargeById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDischarge = await Discharge.findByIdAndRemove(id);
    if (!deletedDischarge) {
      return res.status(404).json({ error: 'Discharge record not found' });
    }
    res.json(deletedDischarge);
  } catch (error) {
    console.error('Error deleting discharge record by ID:', error);
    res.status(500).json({ error: 'Failed to delete discharge record' });
  }
};

// Controller function to generate a discharge summary
exports.generateDischargeSummary = async (req, res) => {
  try {
    // Extract patient and discharge data from the request or your database
    const {
      patient_id,
      dischargeDate,
      dischargeTime,
      clinicalSummary,
      diagnosis,
      treatmentGiven,
      surgicalNotes,
    } = req.body;

    // Get the patient's full name and contact number
    const patient = await Patient.findById(patient_id);
    const patientFullName = `${patient.firstName} ${patient.lastName}`;
    const patientContactNumber = patient.phoneNumber;

    // Get Doctor details
    const doctor = await Doctor.findById(patient.doctor);
    const doctorFullName = `Dr ${doctor.first_name} ${doctor.last_name}`;
    const doctorContactNumber = doctor.phone;
    const doctorEmail = doctor.email;


    // Create a PDF document
    const doc = new PDFDocument({size: 'A4'});
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=discharge_summary.pdf"
    );
    doc.pipe(res); // Pipe the PDF output to the response


    // Add content to the PDF
    // Create a border around the content
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

    doc.font('Helvetica-Bold').fontSize(18).text("DISCHARGE SUMMARY", { align: "center", bold: true });
    doc.moveTo(20, doc.y).lineTo(doc.page.width - 20, doc.y).stroke(); // Draw a line under the title
    doc.moveDown();

    // Reset font to Helvetica for the remaining sections
    doc.font('Helvetica').fontSize(12);

    doc.fontSize(12).text("Patient Information:");
    doc.text(`Full Name: ${patientFullName}`);
    doc.text(`Contact Number: ${patientContactNumber}`);
    doc.text(`Email Address: ${patient.emailAddress}`);
    doc.moveDown();

    doc.fontSize(12).text("Discharge Information:");
    doc.text(`Date of Discharge: ${dischargeDate}`);
    doc.text(`Time of Discharge: ${dischargeTime}`);
    doc.moveDown();

    doc.fontSize(12).text("Primary Consultant:");
    doc.text(`Full Name: ${doctorFullName}`);
    doc.text(`Contact Number: ${doctorContactNumber}`);
    doc.text(`Email Address: ${doctorEmail}`);
    doc.moveDown();
    
    doc.moveTo(20, doc.y).lineTo(doc.page.width - 20, doc.y).stroke(); // Draw a line under the title
    doc.moveDown();
    doc.moveDown();

    // Add a line under "Clinical Summary" for separation
    doc.fontSize(12).text("Clinical Summary:");
    doc.text(clinicalSummary);
    doc.moveDown();

    doc.text("Diagnosis:");
    doc.text(diagnosis);
    doc.moveDown();

    doc.text("Treatment Given:");
    doc.text(treatmentGiven);
    doc.moveDown();

    doc.text("Surgical Notes:");
    doc.text(surgicalNotes);
    doc.moveDown();

    doc.text("Patient's Signature: ______________________          Date: ________________");
    doc.text(`${patientFullName}`);
    doc.moveDown();

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error("Error generating discharge summary:", error);
    res.status(500).json({ error: "Error generating discharge summary" });
  }
};


