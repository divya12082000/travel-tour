// routes/paymentRoutes.js
const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();

// Create a payment
router.post('/', async (req, res) => {
  try {
    const { booking_id, amount, payment_method, status } = req.body;

    // Validate input
    if (!booking_id || !amount || !payment_method || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new payment record
    const payment = new Payment({
      booking_id,
      amount,
      payment_method,
      status
    });

    await payment.save();
    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error });
  }
});

// Fetch payment details by booking ID
router.get('/:booking_id', async (req, res) => {
  try {
    const { booking_id } = req.params;

    const payment = await Payment.findOne({ booking_id });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment details', error });
  }
});

module.exports = router;
