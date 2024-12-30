const Booking = require("../models/Booking");

// Create a new booking
exports.createBooking = async (req, res) => {
    const { user_id, package_id, number_of_people, total_price } = req.body;

    try {
        const booking = new Booking({
            user_id,
            package_id,
            number_of_people,
            total_price,
        });

        await booking.save();
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch all bookings for a specific user
exports.getUserBookings = async (req, res) => {
    const { user_id } = req.params;

    try {
        const bookings = await Booking.find({ user_id }).populate("package_id");
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findByIdAndUpdate(
            id,
            { status: "cancelled" },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
