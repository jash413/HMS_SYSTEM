const OperationTheatre = require('../models/OperationTheatre');
const Anaesthetist = require('../models/Anaesthetist');
const ConsentForm = require('../models/ConsentForm');
const SurgeryRecord = require('../models/SurgeryRecord');
const Doctor = require('../models/Doctors');
const {Equipment,Kit} = require('../models/OTEquipment')
const moment = require('moment');
const Surgery = require('../models/Surgery');
const PDFDocument = require('pdfkit');
const Patient = require('../models/Patients');



// Get all available resources
exports.getAvailableResources = async (req, res) => {
  try {
    const { startTime, endTime } = req.query;

    // Convert 12-hour format times to 24-hour format using moment.js
    const convertedStartTime = moment(startTime, 'hh:mm A').format('HH:mm');
    const convertedEndTime = moment(endTime, 'hh:mm A').format('HH:mm');

    const anaesthetists = await Anaesthetist.find();
    const surgeons = await Doctor.find();
    const operationTheatres = await OperationTheatre.find();
    const kits = await Kit.find();

    const availableAnaesthetists = anaesthetists.filter(anaesthetist => {
      const bookedSlots = anaesthetist.bookedSlots;

      // Check if any booked slot overlaps with the specified time range
      const hasOverlap = bookedSlots.some(slot => {
        return (
          slot.startTime < convertedEndTime &&
          slot.endTime > convertedStartTime
        );
      });

      return (
        !hasOverlap &&
        anaesthetist.workingHours.startTime <= convertedStartTime &&
        anaesthetist.workingHours.endTime >= convertedEndTime
      );
    });

    const availableSurgeons = surgeons.filter(surgeon => {
      const bookedSlots = surgeon.bookedSlots;

      // Check if any booked slot overlaps with the specified time range
      const hasOverlap = bookedSlots.some(slot => {
        return (
          slot.startTime < convertedEndTime &&
          slot.endTime > convertedStartTime
        );
      });

      return (
        !hasOverlap &&
        surgeon.workingHours.startTime <= convertedStartTime &&
        surgeon.workingHours.endTime >= convertedEndTime
      );
    });

    const availableOperationTheatres = operationTheatres.filter(theatre => {
      const bookedSlots = theatre.bookedSlots;

      // Check if any booked slot overlaps with the specified time range
      const hasOverlap = bookedSlots.some(slot => {
        return (
          slot.startTime < convertedEndTime &&
          slot.endTime > convertedStartTime
        );
      });

      return (
        !hasOverlap &&
        theatre.operatingHours.startTime <= convertedStartTime &&
        theatre.operatingHours.endTime >= convertedEndTime
      );
    });


    const availableKits = kits.filter(kit => {
      const schedules = kit.schedules;

      // Check if any booked slot overlaps with the specified time range
      const hasOverlap = schedules.some(slot => {
        return (
          slot.startTime < convertedEndTime &&
          slot.endTime > convertedStartTime
        );
      });

      return (
        !hasOverlap
      );
    });

    res.status(200).json({
      availableAnaesthetists,
      availableSurgeons,
      availableOperationTheatres,
      availableKits,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching available resources' });
  }
};

// Create a new operation theatre
exports.createOperationTheatre = async (req, res) => {
  try {
    const operationTheatre = new OperationTheatre(req.body);
    const savedOperationTheatre = await operationTheatre.save();
    res.status(201).json(savedOperationTheatre);
  } catch (error) {
    res.status(500).json({ error: 'Error creating operation theatre' });
  }
};

// Get all operation theatres
exports.getOperationTheatres = async (req, res) => {
  try {
    const operationTheatres = await OperationTheatre.find();
    res.status(200).json(operationTheatres);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching operation theatres' });
  }
};

// Update an operation theatre
exports.updateOperationTheatre = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOperationTheatre = await OperationTheatre.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOperationTheatre);
  } catch (error) {
    res.status(500).json({ error: 'Error updating operation theatre' });
  }
};

// Create a new anaesthetist
exports.createAnaesthetist = async (req, res) => {
  try {
    const anaesthetist = new Anaesthetist(req.body);
    const savedAnaesthetist = await anaesthetist.save();
    res.status(201).json(savedAnaesthetist);
  } catch (error) {
    res.status(500).json({ error: 'Error creating anaesthetist' });
  }
};

// Get all anaesthetists
exports.getAnaesthetists = async (req, res) => {
  try {
    const anaesthetists = await Anaesthetist.find();
    res.status(200).json(anaesthetists);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching anaesthetists' });
  }
};

// Update an anaesthetist
exports.updateAnaesthetist = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnaesthetist = await Anaesthetist.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAnaesthetist);
  } catch (error) {
    res.status(500).json({ error: 'Error updating anaesthetist' });
  }
};

// Create new OT equipment
exports.createOTEquipment = async (req, res) => {
  try {
    const otEquipment = new Equipment(req.body);
    const savedOTEquipment = await otEquipment.save();
    res.status(201).json(savedOTEquipment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating OT equipment' });
  }
  console.log(req.body);
};

// Get all OT equipments
exports.getOTEquipments = async (req, res) => {
  try {
    const otEquipments = await Equipment.find();
    res.status(200).json(otEquipments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching OT equipments' });
  }
};

// Update an OT equipment
exports.updateOTEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOTEquipment = await Equipment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOTEquipment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating OT equipment' });
  }
};

// Create new OT kit
exports.createOTkit = async (req, res) => {
  try {
    const otKit = new Kit(req.body);
    const savedOTKit = await otKit.save();
    res.status(201).json(savedOTKit);
  } catch (error) {
    res.status(500).json({ error: 'Error creating OT kit' });
  }
};

// Get all OT kits
exports.getOTkit = async (req, res) => {
  try {
    const otKits = await Kit.find();
    res.status(200).json(otKits);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching OT kits' });
  }
};

// Update an OT kit
exports.updateOTkit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOTkit = await Kit.findByIdAndUpdate(
      id,
      req.body,
      { new: true } 
    );
    res.status(200).json(updatedOTkit);
  } catch (error) {
    res.status(500).json({ error: 'Error updating OT kit' });
  }
};

// Create a new consent form
exports.createConsentForm = async (req, res) => {
  try {
    const consentForm = new ConsentForm(req.body);
    const savedConsentForm = await consentForm.save();
    res.status(201).json(savedConsentForm);
  } catch (error) {
    res.status(500).json({ error: 'Error creating consent form' });
  }
};

// Get all consent forms
exports.getConsentForms = async (req, res) => {
  try {
    const consentForms = await ConsentForm.find();
    res.status(200).json(consentForms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching consent forms' });
  }
};

// Update a consent form
exports.updateConsentForm = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedConsentForm = await ConsentForm.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedConsentForm);
  } catch (error) {
    res.status(500).json({ error: 'Error updating consent form' });
  }
};

// Controller function to create a new surgery
exports.createSurgery = async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      anaesthetist_id,
      theatre_id,
      start_time,
      end_time,
      kit_id,
      surgeryType,
    } = req.body;

    // Create a new Surgery document
    const newSurgery = new Surgery({
      patient_id,
      doctor_id,
      anaesthetist_id,
      theatre_id,
      start_time,
      end_time,
      kit_id,
      surgeryType,
    });

    // Save the new Surgery document
    const savedSurgery = await newSurgery.save();

    res.status(201).json(savedSurgery); // Respond with the created Surgery document
  } catch (error) {
    console.error('Error creating surgery:', error);
    res.status(500).json({ error: 'Error creating surgery' });
  }
};

// Controller function to get all surgeries
exports.getAllSurgeries = async (req, res) => {
  try {
    const surgeries = await Surgery.find();
    res.json(surgeries);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching surgeries.' });
  }
};

// Controller function to get a single surgery by ID
exports.getSurgeryById = async (req, res) => {
  try {
    const surgery = await Surgery.findById(req.params.id);
    if (!surgery) {
      return res.status(404).json({ error: 'Surgery not found.' });
    }
    res.json(surgery);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the surgery.' });
  }
};

// Controller function to update a surgery
exports.updateSurgery = async (req, res) => {
  try {
    const updatedSurgery = await Surgery.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Use $set to update only the provided fields
      { new: true }
    );
    if (!updatedSurgery) {
      return res.status(404).json({ error: 'Surgery not found.' });
    }
    res.json(updatedSurgery);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the surgery.' });
  }
};

// Controller function to delete a surgery
exports.deleteSurgery = async (req, res) => {
  try {
    const deletedSurgery = await Surgery.findByIdAndDelete(req.params.id);
    if (!deletedSurgery) {
      return res.status(404).json({ error: 'Surgery not found.' });
    }
    res.json({ message: 'Surgery deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the surgery.' });
  }
};


// Create a new surgery record
exports.createSurgeryRecord = async (req, res) => {
  try {
    const surgeryRecord = new SurgeryRecord(req.body);
    const savedSurgeryRecord = await surgeryRecord.save();
    res.status(201).json(savedSurgeryRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error creating surgery record' });
  }
};

// Get all surgery records
exports.getSurgeryRecords = async (req, res) => {
  try {
    const surgeryRecords = await SurgeryRecord.find();
    res.status(200).json(surgeryRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching surgery records' });
  }
};

// Update a surgery record
exports.updateSurgeryRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSurgeryRecord = await SurgeryRecord.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSurgeryRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error updating surgery record' });
  }
};

// Controller function to generate a consent form
exports.generateConsentForm = async (req, res) => {
  try {
    // Extract patient and surgery data from the request or your database
    const {
      surgeryType,
      start_time,
      end_time,
      doctor_id,
      anaesthetist_id,
      patient_id,
    } = req.body;

    // Get the patient's full name and contact number
    const patient = await Patient.findById(patient_id);
    const patientFullName = `${patient.firstName} ${patient.lastName}`;
    const patientContactNumber = patient.phoneNumber;

    // Get the surgeon's full name
    const surgeon = await Doctor.findById(doctor_id);
    const surgeonName = `Dr ${surgeon.first_name} ${surgeon.last_name}`;

    // Get the anaesthetist's full name
    const anaesthetist = await Anaesthetist.findById(anaesthetist_id);
    const anaesthetistName = `${anaesthetist.name}`;

    // Create a PDF document
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=consent_form.pdf');
    doc.pipe(res); // Pipe the PDF output to the response
    

    // Add content to the PDF
    doc.fontSize(14).text('SURGERY CONSENT FORM', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text('Patient Information:');
    doc.text(`Full Name: ${patientFullName}`);
    // doc.text(`Date of Birth: ${patientDOB}`);
    // doc.text(`Address: ${patientAddress}`);
    doc.text(`Contact Number: ${patientContactNumber}`);
    doc.moveDown();

    doc.fontSize(12).text('Consent for Surgery:');
    doc.text(`I, ${patientFullName}, hereby give my informed consent for the following surgery:`);
    doc.moveDown();
    doc.text(`Type of Surgery: ${surgeryType}`);
    // doc.text(`Date of Surgery: ${surgeryDate}`);
    doc.text(`Scheduled Start Time: ${start_time}`);
    doc.text(`Estimated End Time: ${end_time}`);
    doc.moveDown();

    doc.fontSize(12).text('Surgical Team:');
    doc.text(`Primary Surgeon: ${surgeonName}`);
 
    doc.text(`Anaesthetist: ${anaesthetistName}`);
    // Add other team members if applicable
    doc.moveDown();

    doc.fontSize(12).text('Nature of Procedure:');
    doc.moveDown();

    doc.text('I have been provided with information about the surgery, including its purpose, potential risks, benefits, and alternative treatment options. I have had the opportunity to ask questions and have received satisfactory answers.');
    doc.text('I understand that while the medical team will take all necessary precautions, there are inherent risks associated with any surgical procedure. I am aware of these risks and voluntarily consent to undergo the surgery.');
    doc.text('I also understand that unforeseen circumstances may arise during the surgery that may require the medical team to make decisions in my best interest. I trust the medical team to exercise their professional judgment.');
    doc.text('I acknowledge that I have not been coerced or forced to provide this consent and that I am of sound mind and capable of making this decision.');
    doc.text('I understand that I can withdraw my consent at any time before the surgery begins.');
    doc.moveDown();

    doc.text('Patient\'s Signature: ______________________          Date: ________________');
    doc.text(`${patientFullName}`);
    doc.moveDown();

    doc.text('Surgeon\'s Signature: ______________________          Date: ________________');
    doc.text(`${surgeonName}`);

    // Finalize the PDF
    doc.end()
  } catch (error) {
    console.error('Error generating consent form:', error);
    res.status(500).json({ error: 'Error generating consent form' });
  }
};




