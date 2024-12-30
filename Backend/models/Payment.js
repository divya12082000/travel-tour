// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  payment_date: { type: Date, default: Date.now },
  payment_method: { type: String, enum: ['Card', 'UPI', 'Net Banking', 'Cash'], required: true },
  status: { type: String, enum: ['Success', 'Pending', 'Failed'], required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
