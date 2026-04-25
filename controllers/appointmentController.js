const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Get all appointments for logged-in user
// @route   GET /api/appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate('doctorId', 'name specialty location profileImage')
      .sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason, type } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Doctor, date, and time are required' });
    }

    // Verify doctor exists
    const doctorExists = await Doctor.findById(doctorId);
    if (!doctorExists) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      doctorId,
      date,
      time,
      reason: reason || '',
      type: type || 'in-person',
      status: 'confirmed' // Auto-confirming for this project
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
};

// @desc    Cancel an appointment
// @route   PATCH /api/appointments/:id/cancel
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled', appointment });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ message: 'Error cancelling appointment' });
  }
};

module.exports = { getAppointments, createAppointment, cancelAppointment };
