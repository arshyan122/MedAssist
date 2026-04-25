const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  toggleMedicine,
} = require('../controllers/medicineController');

router.route('/').get(protect, getMedicines).post(protect, createMedicine);
router.route('/:id').put(protect, updateMedicine).delete(protect, deleteMedicine);
router.patch('/:id/toggle', protect, toggleMedicine);

module.exports = router;
