const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getAllClients,
  getClient,
  getLoggedInClientData,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');
// Importing protect middleware
const { protect } = require('../middleware/authMiddleware');
router.post('/register', register);
router.post('/login', login);
router.put('/update-client/:id', protect, updateClient);
router.delete('/delete-client/:id', protect, deleteClient);
router.get('/get-all-clients', protect, getAllClients);
router.get('/get-client/:id', protect, getClient);
router.get('/get-logged-in-client-data', protect, getLoggedInClientData);

module.exports = router;
