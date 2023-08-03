const Hospital = require('../models/Hospitals');

// Controller for getting a list of all hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospitals', error: error.message });
  }
};

// Controller for getting a specific hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hospital', error: error.message });
  }
};

// Controller for creating a new hospital
exports.createHospital = async (req, res) => {
  try {
    const newHospital = await Hospital.create(req.body);
    res.status(201).json(newHospital);
  } catch (error) {
    res.status(400).json({ message: 'Error creating hospital', error: error.message });
  }
};

// Controller for updating a hospital by ID
exports.updateHospital = async (req, res) => {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(400).json({ message: 'Error updating hospital', error: error.message });
  }
};

// Controller for deleting a hospital by ID
exports.deleteHospital = async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!deletedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting hospital', error: error.message });
  }
};
