const express = require('express');
const router = express.Router();
const MedicinesController = require('../controllers/MedicinesController');


// Route to get a specific medicine by ID
router.get('/med/:id', MedicinesController.getMedicineById);

// Route to create a new medicine
router.post('/', MedicinesController.createMedicine);

// Route to partially update a medicine by ID using PATCH
router.patch('/:id', MedicinesController.partialUpdateMedicineById);

// Route to update a medicine by ID
router.put('/med/:id', MedicinesController.updateMedicineById);

// Route to delete a medicine by ID
router.delete('/:id', MedicinesController.deleteMedicineById);

module.exports = router;
