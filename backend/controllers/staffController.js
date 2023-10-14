const Staff = require('../models/Staff'); // Import the Staff model
const moment = require('moment');

// Function to generate the next staff member ID based on the last staff member ID in the database
async function generateStaffId() {
  try {
    const lastStaff = await Staff.findOne().sort({ staff_id: -1 });
    if (lastStaff) {
      const lastStaffIdNumber = parseInt(lastStaff.staff_id.substring(1));
      const newStaffIdNumber = lastStaffIdNumber + 1;
      return `N${newStaffIdNumber.toString().padStart(4, '0')}`;
    } else {
      return 'N0001'; // Initial staff member ID
    }
  } catch (error) {
    console.error('Error generating staff member ID:', error);
    throw error; // Throw the error to be handled in the caller function
  }
}

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff members', error: error.message });
  }
};

// Create a new staff member
exports.createStaff = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const { workingHours } = req.body;

    // Convert 12-hour format times to 24-hour format using moment.js
    const convertedStartTime = moment(workingHours.startTime, 'hh:mm A').format('HH:mm');
    const convertedEndTime = moment(workingHours.endTime, 'hh:mm A').format('HH:mm');

    // Check if a staff member with the same email or phone number already exists
    const existingStaff = await Staff.findOne({ $or: [{ email }, { phone }] });

    if (existingStaff) {
      return res.status(409).json({ message: 'Staff member with the same email or phone number already exists' });
    }

    const staffId = await generateStaffId(); // Generate a new staff member ID
    if (!staffId) {
      throw new Error('Error generating staff member ID');
    }

    const newStaff = await Staff.create({
      ...req.body,
      staff_id: staffId,
      workingHours: {
        startTime: convertedStartTime,
        endTime: convertedEndTime,
      },
    });

    res.status(201).json(newStaff);
  } catch (error) {
    res.status(400).json({ message: 'Error creating staff member', error: error.message });
    console.error(error);
  }
};

// Get a specific staff member by ID
exports.getStaffById = async (req, res) => {
  const staffId = req.params.id;

  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff member', error: error.message });
  }
};

// Update a staff member by ID
exports.updateStaffById = async (req, res) => {
  const staffId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedStaff = await Staff.findByIdAndUpdate(staffId, updatedData, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: 'Error updating staff member', error: error.message });
  }
};

// Delete a staff member by ID
exports.deleteStaffById = async (req, res) => {
  const staffId = req.params.id;

  try {
    const deletedStaff = await Staff.findByIdAndDelete(staffId);
    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting staff member', error: error.message });
  }
};
