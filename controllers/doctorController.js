const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
const getDoctors = async (req, res) => {
  try {
    const { specialization, available } = req.query;
    const filter = {};

    if (specialization) {
      filter.specialization = { $regex: specialization, $options: 'i' };
    }
    if (available !== undefined) {
      filter.available = available === 'true';
    }

    const doctors = await Doctor.find(filter).sort({ rating: -1 });
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: 'Error fetching doctor' });
  }
};

module.exports = { getDoctors, getDoctor };
