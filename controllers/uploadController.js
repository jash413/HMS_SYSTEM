const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // For generating unique filenames

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

// Controller for handling file uploads
exports.uploadFile = upload.single('file'); // Use the name attribute of your file input

// Example function that uses the uploaded file
exports.processFile = async (req, res) => {
  try {
    // Assuming you are using Express and multer middleware
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Process the uploaded file here
    const filePath = req.file.path;

    // Return a success response
    res.status(200).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    res.status(500).json({ message: 'Error processing file', error: error.message });
  }
};
