// routes/adminRoutes.js

const express = require("express");
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAdminDashboard,
  manageTourPackages,
  manageBookings,
  manageUsers,
} = require("../controllers/adminController");

const router = express.Router();

// Protect all routes under /admin
router.use(protect);
router.use(isAdmin);

// Admin Dashboard
router.get("/dashboard", getAdminDashboard);

// Manage Tour Packages (Add, Edit, Delete)
router.post("/tour-packages", manageTourPackages);

// Manage Bookings (Update status)
router.post("/bookings", manageBookings);

// Manage Users (View/Delete)
router.post("/users", manageUsers);

module.exports = router;
