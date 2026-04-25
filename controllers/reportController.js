const Report = require('../models/Report');

// @desc    Get all reports for logged-in user
// @route   GET /api/reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

// @desc    Create a new report
// @route   POST /api/reports
const createReport = async (req, res) => {
  try {
    const { title, doctor, date, category, summary, status } = req.body;

    if (!title || !doctor) {
      return res.status(400).json({ message: 'Title and doctor are required' });
    }

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const report = await Report.create({
      userId: req.user._id,
      title,
      doctor,
      date: date || Date.now(),
      category: category || 'general',
      summary: summary || '',
      status: status || 'normal',
      fileUrl,
    });

    res.status(201).json(report);
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Error creating report' });
  }
};

// @desc    Delete a report
// @route   DELETE /api/reports/:id
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (report.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await report.deleteOne();
    res.json({ message: 'Report deleted' });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ message: 'Error deleting report' });
  }
};

module.exports = { getReports, createReport, deleteReport };
