const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getReports, createReport, deleteReport } = require('../controllers/reportController');

router.route('/').get(protect, getReports).post(protect, upload.single('file'), createReport);
router.route('/:id').delete(protect, deleteReport);

module.exports = router;
