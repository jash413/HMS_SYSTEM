const OperationTheatre = require('../models/OperationTheatre');
const Anaesthetist = require('../models/Anaesthetist');
const OTEquipment = require('../models/OTEquipment');
const ConsentForm = require('../models/ConsentForm');
const SurgeryRecord = require('../models/SurgeryRecord');
const Doctor = require('../models/Doctors');
const moment = require('moment');



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

    res.status(200).json({
      availableAnaesthetists,
      availableSurgeons,
      availableOperationTheatres,
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
    const otEquipment = new OTEquipment(req.body);
    const savedOTEquipment = await otEquipment.save();
    res.status(201).json(savedOTEquipment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating OT equipment' });
  }
};

// Get all OT equipments
exports.getOTEquipments = async (req, res) => {
  try {
    const otEquipments = await OTEquipment.find();
    res.status(200).json(otEquipments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching OT equipments' });
  }
};

// Update an OT equipment
exports.updateOTEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOTEquipment = await OTEquipment.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOTEquipment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating OT equipment' });
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



