const TourPackage = require('../models/TourPackage');

// Fetch all tour packages
exports.getAllTourPackages = async (req, res) => {
  try {
    const tours = await TourPackage.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tour packages', error });
  }
};

// Fetch a specific tour package by ID
exports.getTourPackageById = async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour package not found' });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tour package', error });
  }
};

// Add a new tour package
exports.createTourPackage = async (req, res) => {
  try {
    const tour = new TourPackage(req.body);
    await tour.save();
    res.status(201).json({ message: 'Tour package created successfully', tour });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tour package', error });
  }
};

// Update an existing tour package
exports.updateTourPackage = async (req, res) => {
  try {
    const tour = await TourPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) {
      return res.status(404).json({ message: 'Tour package not found' });
    }
    res.status(200).json({ message: 'Tour package updated successfully', tour });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tour package', error });
  }
};

// Delete a tour package
exports.deleteTourPackage = async (req, res) => {
  try {
    const tour = await TourPackage.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour package not found' });
    }
    res.status(200).json({ message: 'Tour package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tour package', error });
  }
};
