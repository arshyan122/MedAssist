const User = require('../models/User');

// @desc    Get current user profile
// @route   GET /api/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update allowed fields
    const allowedFields = [
      'name', 'age', 'gender', 'phone', 'bloodGroup',
      'allergies', 'conditions', 'address', 'emergencyContact'
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Handle profile image if uploaded
    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      gender: updatedUser.gender,
      phone: updatedUser.phone,
      bloodGroup: updatedUser.bloodGroup,
      profileImage: updatedUser.profileImage,
      allergies: updatedUser.allergies,
      conditions: updatedUser.conditions,
      address: updatedUser.address,
      emergencyContact: updatedUser.emergencyContact,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

module.exports = { getProfile, updateProfile };
