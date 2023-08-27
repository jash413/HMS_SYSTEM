const express = require('express');
const cors = require('cors');
const app = express();
const port = 3100; // Replace with your desired port number

// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

// Import the database connection from db.js
// const { connectToDB } = require('./models/db');

// Connect to the database
// connectToDB()
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

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
const medicinesRouter=require('./routes/medicines')

// app.use(usersRouter);
app.use(patientsRouter);
app.use(doctorsRouter);

app.use(appointmentsRouter);
app.use(wardRouter);
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
