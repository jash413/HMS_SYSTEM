const mongoose = require('mongoose');
const db = require('./db');

const billingSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to the patient
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to the doctor who provided services
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  admissionDate: {
    type: Date,
  },
  ward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ward', // Reference to the ward where the patient was admitted
  },
  dischargeDate: {
    type: Date,
  },
  isOutpatient: {
    type: Boolean,
    default: true,
  },
  services: [
    {
      serviceName: {
        type: String,
        required: true,
      },
      serviceCharge: {
        type: Number,
        required: true,
      },
    },
  ],
  registrationFee: {
    type: Number,
    default: 500,
  },
  roomCharges: {
    type: Number, // Room charges will be calculated automatically for inpatients
  },
  medicationCharges: {
    type: Number,
    default: 0,
  },
  labCharges: {
    type: Number,
    default: 0,
  },
  gstPercentage: {
    type: Number, // GST percentage
    default: 18, // Default to 18%, adjust as needed
  },
  gst: {
    type: Number, // Calculated GST amount
  },
  totalCharges: {
    type: Number, // Total charges will be calculated automatically
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Overdue'],
    default: 'Pending',
  },
});

// Calculate room charges based on the number of days between admission and discharge and the daily room rate
billingSchema.pre('save', async function (next) {
  if (!this.isOutpatient && this.admissionDate && this.dischargeDate) {
    const daysInHospital = Math.ceil(
      (this.dischargeDate - this.admissionDate) / (1000 * 3600 * 24)
    );

    // Fetch the ward details to get the daily room rate
    const ward = await mongoose.model('Ward').findById(this.ward);
    if (ward) {
      this.roomCharges = daysInHospital * ward.dailyRoomRate;
    }
  } else {
    this.roomCharges = 0;
  }

  // Calculate total charges based on individual service charges, fees, and GST
  const servicesTotal = this.services.reduce(
    (total, service) => total + service.serviceCharge,
    0
  );

  // Calculate GST amount based on the GST percentage
  this.gst = (this.gstPercentage / 100) * (servicesTotal + this.registrationFee + this.roomCharges + this.medicationCharges + this.labCharges);

  // Calculate total charges including GST
  this.totalCharges =
    servicesTotal +
    this.registrationFee +
    this.roomCharges +
    this.medicationCharges +
    this.labCharges +
    this.gst; // Include GST in total charges

  next();
});

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
