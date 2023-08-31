const DoctorAppointment = require('../models/Appointments');

const appointmentsController = {
    createAppointment: async (req, res) => {
      const { patient, doctor, admissionDate ,title,to,admissionTime } = req.body;
        try {
          
    
          // Check if there's an existing appointment at the same date and time
          const existingAppointment = await DoctorAppointment.findOne({ doctor, admissionDate });
    
          if (existingAppointment) {
            return res.status(409).json({ message: 'Appointment slot already taken' });
          }
    
          const newAppointment = await DoctorAppointment.create({
            patient,
            doctor,
            title,
            admissionDate,
            to,
            admissionTime,
            status: 'Scheduled',
          });
          console.log(patient)
    
          res.status(201).json(newAppointment);
        } catch (error) {
          res.status(400).json({ message: 'Error creating appointment', error: error.message });
        }
      },
  updateAppointmentStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(400).json({ message: 'Error updating appointment status', error: error.message });
    }
  },

  getAppointmentsByDateRange: async (req, res) => {
    const { start, end } = req.query;
    try {
      const appointments = await Appointment.find({
        date: { $gte: new Date(start), $lte: new Date(end) },
      });
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching appointments by date range', error: error.message });
    }
  },
  getAllAppointments: async (req, res) => {
    try {
      const appointments = await DoctorAppointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all appointments', error: error.message });
    }
  },
};

module.exports = appointmentsController;
