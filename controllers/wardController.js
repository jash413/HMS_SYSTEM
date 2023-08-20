const Ward = require('../models/Ward');

// Controller for getting a list of all wards
exports.getAllWards = async (req, res) => {
  try {
    const wards = await Ward.find();
    res.status(200).json(wards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wards', error: error.message });
  }
};

// Controller for getting a specific ward by wardNumber
exports.getWardByNumber = async (req, res) => {
  try {
    const ward = await Ward.findOne({ wardNumber: req.params.wardNumber });
    if (!ward) {
      return res.status(404).json({ message: 'Ward not found' });
    }
    res.status(200).json(ward);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ward', error: error.message });
  }
};

// Controller for updating the status of a ward by wardNumber
exports.updateWardStatus = async (req, res) => {
  const { wardNumber } = req.params;
  const { status } = req.body;

  try {
    const updatedWard = await Ward.findOneAndUpdate(
      { wardNumber },
      { status },
      { new: true }
    );

    if (!updatedWard) {
      return res.status(404).json({ message: 'Ward not found' });
    }

    res.status(200).json(updatedWard);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ward status', error: error.message });
  }
};

// Controller for creating a new ward
exports.createWard = async (req, res) => {
  try {
    const newWard = await Ward.create(req.body);
    res.status(201).json(newWard);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ward', error: error.message });
  }
};

// Controller for updating a ward by wardNumber
exports.updateWard = async (req, res) => {
  try {
    const updatedWard = await Ward.findOneAndUpdate(
      { wardNumber: req.params.wardNumber },
      req.body,
      { new: true }
    );
    if (!updatedWard) {
      return res.status(404).json({ message: 'Ward not found' });
    }
    res.status(200).json(updatedWard);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ward', error: error.message });
  }
};

// Controller for deleting a ward by wardNumber
exports.deleteWard = async (req, res) => {
  try {
    const ward = await Ward.find({ wardNumber: req.query.wardNumber });
    console.log(ward);
    if (ward[0].status === 'Occupied') {
      return res.status(404).json({ message: 'Ward is occupied' });
    }else{
    const deletedWard = await Ward.findOneAndDelete(ward.wardNumber);
    console.log(req.query.wardNumber);
    if (!deletedWard) {
      return res.status(404).json({ message: 'Ward not found' });
    }
    res.status(200).json({ message: 'Ward deleted successfully' });
  }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting ward', error: error.message });
  }
};

