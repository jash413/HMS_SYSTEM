const multer = require('multer');
const Patient = require('../models/Patients');


// Function to generate the next patient ID based on the last patient ID in the database
async function generatePatientId() {
  try {
    const lastPatient = await Patient.findOne().sort({ patient_id: -1 });
    if (lastPatient) {
      const lastPatientIdNumber = parseInt(lastPatient.patient_id.substring(1));
      const newPatientIdNumber = lastPatientIdNumber + 1;
      return `P${newPatientIdNumber.toString().padStart(4, '0')}`;
    } else {
      return 'P0001'; // Initial patient ID
    }
  } catch (error) {
    console.error('Error generating patient ID:', error);
    throw error; // Throw the error to be handled in the caller function
  }
}

// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename (you can use a library like uuid)
//     const uniqueFileName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueFileName);
//   },
// });
// const upload = multer({ storage: storage });

// Controller for getting a list of all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// Controller for getting a specific patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};




// Controller for creating a new patient with file upload
exports.createPatient =async (req, res) => {
  try {
    const { phoneNumber } = req.body;
console.log('Received phoneNumber:', phoneNumber);

// Check if a patient with the same phone number already exists
const existingPatient = await Patient.findOne({ phoneNumber });

console.log('Existing Patient:', existingPatient);

if (existingPatient) {
  console.log('Patient with the same phone number already exists');
  return res.status(409).json({ message: 'Patient with the same phone number already exists' });
}
    

    const patientId = await generatePatientId(); // Generate a new patient ID
    if (!patientId) {
      throw new Error('Error generating patient ID');
    }
    const newPatient = await Patient.create({
      ...req.body,
      // filesDocumentUpload: req.file.path, // Store the path to the uploaded file
      patient_id: patientId  
    });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error creating patient', error: error.message });
    console.error(error)
  }
};

// Controller for updating a patient by ID
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error updating patient', error: error.message });
  }
};

// Controller for deleting a patient by ID
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting patient', error: error.message });
  }
};


