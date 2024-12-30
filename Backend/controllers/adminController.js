// controllers/adminController.js

const TourPackage = require("../models/TourPackage");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Review = require("../models/Review");
const Payment = require("../models/Payment");

const getAdminDashboard = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const topDestinations = await TourPackage.aggregate([
      { $group: { _id: "$destination", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    
    res.status(200).json({
      totalBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      topDestinations,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get dashboard data", error });
  }
};

const manageTourPackages = async (req, res) => {
  const { action, packageId, packageData } = req.body;

  try {
    if (action === "add") {
      const newPackage = new TourPackage(packageData);
      await newPackage.save();
      res.status(201).json({ message: "Tour package added successfully" });
    } else if (action === "edit" && packageId) {
      await TourPackage.findByIdAndUpdate(packageId, packageData, {
        new: true,
      });
      res.status(200).json({ message: "Tour package updated successfully" });
    } else if (action === "delete" && packageId) {
      await TourPackage.findByIdAndDelete(packageId);
      res.status(200).json({ message: "Tour package deleted successfully" });
    } else {
      res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to manage tour packages", error });
  }
};

const manageBookings = async (req, res) => {
  const { bookingId, status } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    booking.status = status;
    await booking.save();
    res.status(200).json({ message: "Booking status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to manage booking", error });
  }
};

const manageUsers = async (req, res) => {
  const { userId, action } = req.body;

  try {
    if (action === "view" && userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } else if (action === "delete" && userId) {
      await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to manage user", error });
  }
};

module.exports = {
  getAdminDashboard,
  manageTourPackages,
  manageBookings,
  manageUsers,
};
