const express = require('express');
const { registerUser, loginUser, getUserById } = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', protect, getUserById);

// Admin-only route example
router.get('/admin/data', protect, isAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

module.exports = router;
