const express = require("express");
const {
    createBooking,
    getUserBookings,
    cancelBooking,
} = require("../controllers/bookingController");

const router = express.Router();

// POST /bookings
router.post("/", createBooking);

// GET /bookings/:user_id
router.get("/:user_id", getUserBookings);

// PATCH /bookings/cancel/:id
router.patch("/cancel/:id", cancelBooking);

module.exports = router;
