const express = require('express');
const cors = require('cors');
const app = express();
const port = 3100; // Replace with your desired port number


// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());


// Routes
// const usersRouter = require('./routes/user');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');
// const billingRouter = require('./routes/billing');
// const departmentsRouter = require('./routes/departments');
// const ehrRouter = require('./routes/ehr');
// const notificationsRouter = require('./routes/notifications');
// const reportsRouter = require('./routes/reports');
// const settingsRouter = require('./routes/settings');
const uploadsRouter = require('./routes/uploads');
const pdfRouter = require('./routes/pdf');
// const hospitalRouter = require('./routes/hospital'); // Add hospital route
const wardRouter = require('./routes/ward');
const admissionRouter = require('./routes/admission');
const otRouter = require('./routes/ot');
const medicinesRouter = require('./routes/medicines');

// Use routes
// app.use(usersRouter);
app.use(otRouter);
app.use(patientsRouter);
app.use(doctorsRouter);
// app.use(wardRouter);
app.use(appointmentsRouter);
// app.use(billingRouter);
// app.use(departmentsRouter);
// app.use(ehrRouter);
// app.use(notificationsRouter);
// app.use(reportsRouter);
// app.use(settingsRouter);
app.use(uploadsRouter);
app.use(pdfRouter);
app.use(medicinesRouter)
// app.use(hospitalRouter); // Use hospital route
app.use(admissionRouter);
app.use(wardRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
