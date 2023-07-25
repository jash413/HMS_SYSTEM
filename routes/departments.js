const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department');

// Route to get all departments
router.get('/departments', departmentController.getAllDepartments);

// Route to create a new department
router.post('/departments', departmentController.createDepartment);

// Route to get a specific department by id
router.get('/departments/:id', departmentController.getDepartmentById);

// Route to update a department by id
router.patch('/departments/:id', departmentController.updateDepartmentById);

// Route to delete a department by id
router.delete('/departments/:id', departmentController.deleteDepartmentById);

module.exports = router;
