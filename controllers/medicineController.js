const Medicine = require('../models/Medicine');

// @desc    Get all medicines for logged-in user
// @route   GET /api/medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.user._id }).sort({ time: 1 });
    res.json(medicines);
  } catch (error) {
    console.error('Get medicines error:', error);
    res.status(500).json({ message: 'Error fetching medicines' });
  }
};

// @desc    Create a new medicine
// @route   POST /api/medicines
const createMedicine = async (req, res) => {
  try {
    const { name, dosage, time, frequency, notes, startDate, endDate } = req.body;

    if (!name || !dosage || !time) {
      return res.status(400).json({ message: 'Name, dosage, and time are required' });
    }

    const medicine = await Medicine.create({
      userId: req.user._id,
      name,
      dosage,
      time,
      frequency: frequency || 'daily',
      notes: notes || '',
      startDate: startDate || Date.now(),
      endDate: endDate || null,
    });

    res.status(201).json(medicine);
  } catch (error) {
    console.error('Create medicine error:', error);
    res.status(500).json({ message: 'Error creating medicine' });
  }
};

// @desc    Update a medicine
// @route   PUT /api/medicines/:id
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    if (medicine.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    console.error('Update medicine error:', error);
    res.status(500).json({ message: 'Error updating medicine' });
  }
};

// @desc    Delete a medicine
// @route   DELETE /api/medicines/:id
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    if (medicine.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await medicine.deleteOne();
    res.json({ message: 'Medicine deleted' });
  } catch (error) {
    console.error('Delete medicine error:', error);
    res.status(500).json({ message: 'Error deleting medicine' });
  }
};

// @desc    Toggle medicine enabled status
// @route   PATCH /api/medicines/:id/toggle
const toggleMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    if (medicine.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    medicine.enabled = !medicine.enabled;
    await medicine.save();

    res.json(medicine);
  } catch (error) {
    console.error('Toggle medicine error:', error);
    res.status(500).json({ message: 'Error toggling medicine' });
  }
};

module.exports = { getMedicines, createMedicine, updateMedicine, deleteMedicine, toggleMedicine };
