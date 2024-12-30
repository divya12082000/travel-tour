const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const tourRoutes = require('./routes/tourRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require("./routes/adminRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use('/uploads', express.static('uploads')); // Serve static files for uploads

// Routes
app.use('/users', userRoutes);// User routes
app.use('/api/tour-packages', tourRoutes);  // Tour packages routes
app.use('/reviews', reviewRoutes);    // Review routes
app.use('/bookings', bookingRoutes);  // Booking routes
app.use('/payments', paymentRoutes);  // Payment routes

app.use("/api/admin", adminRoutes);      // Admin routes

// Default route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
