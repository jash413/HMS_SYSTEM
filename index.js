const express = require('express');
const cors = require('cors');
const app = express();
const port = 3100; // Replace with your desired port number


// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());


// Routes
const dashboardRouter = require('./routes/dashboard');
const dischargeRouter = require('./routes/discharge');
const usersRouter = require('./routes/users');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');
const billingRouter = require('./routes/billing');
const ehrRouter = require('./routes/ehr');
const uploadsRouter = require('./routes/uploads');
const pdfRouter = require('./routes/pdf');
const hospitalRouter = require('./routes/hospital');
const wardRouter = require('./routes/ward');
const admissionRouter = require('./routes/admission');
const otRouter = require('./routes/ot');
const medicinesRouter = require('./routes/medicines');
const staffRouter=require("./routes/staff")



// Use routes
app.use(dashboardRouter);
app.use(billingRouter);
app.use(dischargeRouter);
app.use(usersRouter);
app.use(otRouter);
app.use(patientsRouter);
app.use(doctorsRouter);
app.use(wardRouter);
app.use(appointmentsRouter);

app.use(ehrRouter);
app.use(uploadsRouter);
app.use(pdfRouter);
app.use(medicinesRouter)
app.use(hospitalRouter); 
app.use(admissionRouter);
app.use(wardRouter);
app.use(staffRouter);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
