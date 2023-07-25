const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');

// Route to get all notifications
router.get('/notifications', notificationController.getAllNotifications);

// Route to create a new notification
router.post('/notifications', notificationController.createNotification);

// Route to get a specific notification by id
router.get('/notifications/:id', notificationController.getNotificationById);

// Route to update a notification by id
router.patch('/notifications/:id', notificationController.updateNotificationById);

// Route to delete a notification by id
router.delete('/notifications/:id', notificationController.deleteNotificationById);

module.exports = router;
