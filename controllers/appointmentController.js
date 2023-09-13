const DoctorAppointment = require("../models/Appointments");
const Doctor = require("../models/Doctors");
const moment=require("moment")
const appointmentsController = {
  createAppointment: async (req, res) => {
    const { patient, doctor, appointmentDate, title, endingTime, startingTime } = req.body;
    try {
      // Check if the doctor exists
      const doc = await Doctor.findById(doctor);
      if (!doc) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      // Parse the selected start and end times into moment objects
      const slotStartTime = moment(startingTime, "HH:mm");
      const slotEndTime = moment(endingTime, "HH:mm");
      const convertedSelectedDate = moment(appointmentDate, "YYYY-MM-DD").format("YYYY-MM-DD");
  
      // Check if the selected time slot overlaps with any booked slot
      const isSlotBooked = doc.bookedSlots.some((bookedSlot) => {
        const slotDate = moment(bookedSlot.date, "YYYY-MM-DD").format("YYYY-MM-DD");
        const bookedSlotStartTime = moment(bookedSlot.startTime, "HH:mm");
        const bookedSlotEndTime = moment(bookedSlot.endTime, "HH:mm");
  
        // Check for overlap
        if (
          slotDate === convertedSelectedDate &&
          ((slotStartTime >= bookedSlotStartTime &&
            slotStartTime < bookedSlotEndTime) ||
            (slotEndTime > bookedSlotStartTime &&
              slotEndTime <= bookedSlotEndTime))
        ){
          return true; // Slot is booked
        }
  
        return false;
      });
  
      // Check if the slot is within the doctor's working hours
      const workingHoursStartTime = moment(doc.workingHours.startTime, "HH:mm");
      const workingHoursEndTime = moment(doc.workingHours.endTime, "HH:mm");
  
      if (
        isSlotBooked ||
        slotStartTime.isBefore(workingHoursStartTime) ||
        slotEndTime.isAfter(workingHoursEndTime)
      ) {
        return res.status(409).json({ message: 'Appointment slot not available or outside working hours' });
      }
  
      const newAppointment = await DoctorAppointment.create({
        patient,
        doctor,
        title,
        appointmentDate,
        endingTime,
        startingTime,
        status: "Scheduled",
      });
  
      res.status(201).json(newAppointment);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error creating appointment", error: error.message });
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
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res
        .status(400)
        .json({
          message: "Error updating appointment status",
          error: error.message,
        });
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
      res
        .status(500)
        .json({
          message: "Error fetching appointments by date range",
          error: error.message,
        });
    }
  },
  getAllAppointments: async (req, res) => {
    try {
      const appointments = await DoctorAppointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error fetching all appointments",
          error: error.message,
        });
    }
  },
};

module.exports = appointmentsController;
