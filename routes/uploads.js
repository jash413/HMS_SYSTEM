const express = require('express');
const router = express.Router();
const upload = require('../controllers/uploadController');

router.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const filePath = req.file.path;
  res.status(201).json({ message: 'File uploaded successfully', filePath: filePath });
});

module.exports = router;
