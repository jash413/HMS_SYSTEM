const { json } = require('body-parser');
const Doctor = require('../models/Doctors');
const moment = require("moment");

// Function to generate the next doctor ID based on the last doctor ID in the database
async function generateDoctorId() {
  try {
    const lastDoctor = await Doctor.findOne().sort({ doctor_id: -1 });
    if (lastDoctor) {
      const lastDoctorIdNumber = parseInt(lastDoctor.doctor_id.substring(1));
      const newDoctorIdNumber = lastDoctorIdNumber + 1;
      return `D${newDoctorIdNumber.toString().padStart(4, '0')}`;
    } else {
      return 'D0001'; // Initial patient ID
    }
  } catch (error) {
    console.error('Error generating doctor ID:', error);
    throw error; // Throw the error to be handled in the caller function
  }
}
// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

// Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const { workingHours } = req.body;

    // Convert 12-hour format times to 24-hour format using moment.js
    const convertedStartTime = moment(workingHours.startTime, "hh:mm A").format("HH:mm");
    const convertedEndTime = moment(workingHours.EndTime, "hh:mm A").format("HH:mm");

    // Check if a doctor with the same email or phone number already exists
    const existingDoctor = await Doctor.findOne({ $or: [{ email }, { phone }] });

    console.log('Existing Doctor:', existingDoctor);

    if (existingDoctor) {
      console.log('Doctor with the same email or phone number already exists');
      return res.status(409).json({ message: 'Doctor with the same email or phone number already exists' });
    }

    const DoctorId = await generateDoctorId(); // Generate a new doctor ID
    if (!DoctorId) {
      throw new Error('Error generating doctor ID');
    }

      const newDoctor = await Doctor.create({
        ...req.body,
        doctor_id: DoctorId,
        workingHours: {
          startTime: convertedStartTime,
          EndTime: convertedEndTime,
        },
      });
  
      res.status(201).json(newDoctor);
  
  } catch (error) {
    res.status(400).json({ message: 'Error creating doctor', error: error.message });
    console.error(error)
  }
};


// Get a specific doctor by ID
exports.getDoctorById = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error: error.message });
  }
};

// Update a doctor by ID
exports.updateDoctorById = async (req, res) => {
  const doctorId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updatedData, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: 'Error updating doctor', error: error.message });
  }
};

// Delete a doctor by ID
exports.deleteDoctorById = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting doctor', error: error.message });
  }
};


exports.calculateSlots = async (req, res) => {
  const {selectedDate,id } = req.query
  console.log(id)
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      console.log(doctor)
      return res.status(404).json({ message: 'Doctor not found' });
    }
    // Calculate available slots
  const availableSlots = calculateAvailableSlots(doctor.workingHours, doctor.bookedSlots,30,selectedDate);

  // Send the availableSlots as a response
  res.status(200).json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error: error.message });
  }
};
const calculateAvailableSlots = (workingHours, bookedSlots, duration, selectedDate) => {
  const availableSlots = [];

  // Convert working hours to moment objects
  const startWorkingHour = moment(workingHours.startTime, 'HH:mm');
  const endWorkingHour = moment(workingHours.endTime, 'HH:mm');

  // Create a moment duration for the slot duration (45 minutes)
  const slotDuration = moment.duration(duration, 'minutes');

  // Initialize the current time to the start of working hours
  let currentTime = startWorkingHour.clone();

  // Iterate through the working hours
  while (currentTime.isBefore(endWorkingHour)) {
    // Calculate the end time of the current slot
    const slotEndTime = currentTime.clone().add(slotDuration);

    // Check if the slot end time is before the end of working hours
    if (slotEndTime.isBefore(endWorkingHour)) {
      // Check if the current time slot is booked for the selected date
      const isSlotBooked = bookedSlots.some((bookedSlot) => {
        const slotDate = moment(bookedSlot.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        const startBookedTime = moment(bookedSlot.startTime, 'HH:mm');
        const endBookedTime = moment(bookedSlot.endTime, 'HH:mm');
        return (
          slotDate === selectedDate &&
          (
            (startBookedTime.isBefore(slotEndTime) && endBookedTime.isAfter(currentTime)) ||
            (startBookedTime.isSameOrBefore(currentTime) && endBookedTime.isSameOrAfter(slotEndTime))
          )
        );
      });
    
      // If the slot is not booked, add it to the availableSlots array
      if (!isSlotBooked) {
        availableSlots.push({
          startTime: currentTime.format('HH:mm'),
          endTime: slotEndTime.format('HH:mm'),
        });
      }
    }

    // Move to the next slot
    currentTime.add(slotDuration);
  }

  // Calculate remaining time based on the last available slot
  const lastSlotEndTime = moment(availableSlots[availableSlots.length - 1].endTime, 'HH:mm');
  const remainingTime = endWorkingHour.diff(lastSlotEndTime, 'minutes');

  // Add a new slot for the remaining time
  const remainingStartTime = lastSlotEndTime.format('HH:mm');
  const remainingEndTime = endWorkingHour.format('HH:mm');
  availableSlots.push({
    startTime: remainingStartTime,
    endTime: remainingEndTime,
  });

  return availableSlots;
};
