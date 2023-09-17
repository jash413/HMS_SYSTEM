const mongoose = require("mongoose");
const VitalSigns = require("../models/VitalSigns");
const LabResults = require("../models/LabResults");
const Medications = require("../models/Medications");
const ClinicalExaminations = require("../models/ClinicalExaminations");
const DiagnosticImaging = require("../models/DiagnosticImaging");
const Prescriptions = require("../models/Prescriptions");
const MedicalHistory = require("../models/MedicalHistory"); // Updated to use merged modal

// Create a new record for a specific component
exports.createRecord = async (req, res) => {
  try {
    const { component } = req.params;
    const requestBody = req.body;

    let newRecord;
    switch (component) {
      case "vitalsigns":
        newRecord = new VitalSigns(requestBody);
        break;
      case "labresults":
        newRecord = new LabResults(requestBody);
        break;
      case "medications":
        newRecord = new Medications(requestBody);
        break;
      case "ClinicalExaminations":
        newRecord = new ClinicalExaminations(requestBody);
        break;
      case "diagnosticimaging":
        newRecord = new DiagnosticImaging(requestBody);
        break;
      case "prescriptions":
        newRecord = new Prescriptions(requestBody);
        break;
      case "medicalhistory":
        newRecord = new MedicalHistory(requestBody);
        break;
      // Add more cases for other components
      default:
        return res.status(400).json({ error: "Invalid component" });
    }

    const savedRecord = await newRecord.save();

    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve records for a specific component
exports.getRecordsForComponent = async (req, res) => {
  try {
    const { component, id } = req.params;

    let records;

    switch (component) {
      case "vitalsigns":
        records = await VitalSigns.find({ patient: id });
        break;
      case "labresults":
        records = await LabResults.find({ patient: id });
        break;
      case "medications":
        records = await Medications.find({ patient: id });
        break;
      case "ClinicalExaminations":
        records = await ClinicalExaminations.find({ visit: id });
        break;
      case "diagnosticimaging":
        records = await DiagnosticImaging.find({ visit: id });
        break;
      case "prescriptions":
        records = await Prescriptions.find({ visit: id });
        break;
      case "medicalhistory":
        records = await MedicalHistory.find({ patient: id }); // Updated to use merged modal
        break;
      // Add more cases for other components
      default:
        return res.status(400).json({ error: "Invalid component" });
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a record for a specific component
exports.updateRecord = async (req, res) => {
  try {
    const { component, id } = req.params;
    const updatedRecordData = req.body;

    let updatedRecord;

    switch (component) {
      case "vitalsigns":
        updatedRecord = await VitalSigns.findByIdAndUpdate(id, updatedRecordData, {
          new: true,
        });
        break;
      case "labresults":
        updatedRecord = await LabResults.findByIdAndUpdate(id, updatedRecordData, {
          new: true,
        });
        break;
      case "medications":
        updatedRecord = await Medications.findByIdAndUpdate(id, updatedRecordData, {
          new: true,
        });
        break;
      case "ClinicalExaminations":
        updatedRecord = await ClinicalExaminations.findByIdAndUpdate(id, updatedRecordData, {
          new: true,
        });
        break;
      case "diagnosticimaging":
        updatedRecord = await DiagnosticImaging.findByIdAndUpdate(id, updatedRecordData, {
          new: true,
        });
        break;
      case "prescriptions":
        updatedRecord = await Prescriptions.findByIdAndUpdate(id, updatedRecordData, {
          new: true,
        });
        break;
      case "medicalhistory":
        updatedRecord = await MedicalHistory.findByIdAndUpdate(id, updatedRecordData, {
          new: true,
        }); // Updated to use merged modal
        break;
      // Add more cases for other components
      default:
        return res.status(400).json({ error: "Invalid component" });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a record for a specific component
exports.deleteRecord = async (req, res) => {
  try {
    const { component, id } = req.params;

    switch (component) {
      case "vitalsigns":
        await VitalSigns.findByIdAndDelete(id);
        break;
      case "labresults":
        await LabResults.findByIdAndDelete(id);
        break;
      case "medications":
        await Medications.findByIdAndDelete(id);
        break;
      case "ClinicalExaminations":
        await ClinicalExaminations.findByIdAndDelete(id);
        break;
      case "diagnosticimaging":
        await DiagnosticImaging.findByIdAndDelete(id);
        break;
      case "prescriptions":
        await Prescriptions.findByIdAndDelete(id);
        break;
      case "medicalhistory":
        await MedicalHistory.findByIdAndDelete(id); // Updated to use merged modal
        break;
      // Add more cases for other components
      default:
        return res.status(400).json({ error: "Invalid component" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
