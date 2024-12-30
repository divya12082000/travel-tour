const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: "TourPackage", required: true },
    number_of_people: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    payment_status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
    booking_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
