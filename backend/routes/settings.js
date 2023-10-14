const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings');

// Route to get all settings
router.get('/settings', settingsController.getAllSettings);

// Route to create new settings
router.post('/settings', settingsController.createSettings);

// Route to get specific settings by id
router.get('/settings/:id', settingsController.getSettingsById);

// Route to update settings by id
router.patch('/settings/:id', settingsController.updateSettingsById);

// Route to delete settings by id
router.delete('/settings/:id', settingsController.deleteSettingsById);

module.exports = router;
