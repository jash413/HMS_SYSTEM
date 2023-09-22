const express = require("express");
const router = express.Router();
const ehrController = require("../controllers/ehrController");
const authenticateToken = require('../middleware/authMiddleware');

// Create a new record for a specific component
router.post("/api/ehr/:component",authenticateToken,ehrController.createRecord);

// Retrieve records for a specific component
router.get("/api/ehr/:component/:id", authenticateToken,ehrController.getRecordsForComponent);

// Update a record for a specific component
router.put("/api/ehr/:component/:id", authenticateToken,ehrController.updateRecord);

// Delete a record for a specific component
router.delete("/api/ehr/:component/:id", authenticateToken,ehrController.deleteRecord);

module.exports = router;
