const express = require('express');
const router = express.Router();
const MedicinesController = require('../controllers/MedicinesController');

// Route to get all medicines
router.get('/stock', MedicinesController.getAllMedicines);

// Route to get a specific medicine by ID
router.get('/:id', MedicinesController.getMedicineById);

// Route to create a new medicine
router.post('/', MedicinesController.createMedicine);

// Route to update a medicine by ID
router.put('/:id', MedicinesController.updateMedicineById);

// Route to delete a medicine by ID
router.delete('/:id', MedicinesController.deleteMedicineById);

module.exports = router;
