const Medicine = require('../models/Medicines'); // Import the Medicine model

// Controller functions for managing medicines
const MedicinesController = {
  // Get all medicines
  getAllMedicines: async (req, res) => {
    try {
      const medicines = await Medicine.find();
      res.status(200).json(medicines);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching medicines', error: error.message });
    }
  },

  // Get a specific medicine by ID
  getMedicineById: async (req, res) => {
    const { id } = req.params;
    try {
      const medicine = await Medicine.findById(id);
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(200).json(medicine);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching medicine', error: error.message });
    }
  },

  // Add a new medicine
  createMedicine: async (req, res) => {
    try {
      const newMedicine = await Medicine.create(req.body);
      res.status(201).json(newMedicine);
    } catch (error) {
      res.status(400).json({ message: 'Error creating medicine', error: error.message });
    }
  },

  // Update a medicine by ID
  updateMedicineById: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedMedicine = await Medicine.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedMedicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(200).json(updatedMedicine);
    } catch (error) {
      res.status(400).json({ message: 'Error updating medicine', error: error.message });
    }
  },

  // Delete a medicine by ID
  deleteMedicineById: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedMedicine = await Medicine.findByIdAndDelete(id);
      if (!deletedMedicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ message: 'Error deleting medicine', error: error.message });
    }
  },
  // Partially update a medicine by ID
partialUpdateMedicineById: async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // The fields to update

  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(400).json({ message: 'Error updating medicine', error: error.message });
  }
},
};

module.exports = MedicinesController;
