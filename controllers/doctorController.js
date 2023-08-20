const Doctor = require('../models/Doctors');

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
    console.log('Received email:', email);
    console.log('Received phone:', phone);

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
