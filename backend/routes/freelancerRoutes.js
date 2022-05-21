const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getFreelancers,
  getFreelancerDataById,
  getLoggedInFreelancerData,
  updateFreelancerData,
  deleteFreelancerDataById,
} = require('../controllers/freelancerController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/', protect, getFreelancers);
router.get('/get-freelancer-data/:id', protect, getFreelancerDataById);
router.get(
  '/get-logged-in-freelancer-data',
  protect,
  getLoggedInFreelancerData
);
router.put('/update-freelancer-data', protect, updateFreelancerData);
router.delete('/delete-freelancer-data/:id', protect, deleteFreelancerDataById);

module.exports = router;
