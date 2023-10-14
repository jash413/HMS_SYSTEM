const Patient = require("../models/Patients");
const Doctor = require("../models/Doctors");
const Appointment = require("../models/Appointments");
const Staff = require("../models/Staff");

// Hospitality Status
exports.getHospitalityStatus = async (req, res) => {
  try {
    const hospital_id = req.body.hospital_id;
    const patients = await Patient.find({ hospital_id: hospital_id });
    const doctors = await Doctor.find({ hospital_id: hospital_id });
    const appointments = await Appointment.find({ hospital_id: hospital_id });
    const nurse = await Staff.find({ role: "Nurse", hospital_id: hospital_id });
    const patientPerDoctor = Math.round(patients.length / doctors.length);
    res.status(200).json({
      patients: patients.length,
      doctors: doctors.length,
      appointments: appointments.length,
      nurse: nurse.length,
      patientPerDoctor: patientPerDoctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching hospitality status",
      error: error.message,
    });
  }
};
