const Review = require('../models/Review');

// Add a review
exports.addReview = async (req, res) => {
  try {
    const { user_id, package_id, rating, review } = req.body;
    const newReview = new Review({ user_id, package_id, rating, review });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};

// Fetch all reviews for a specific tour package
exports.getReviewsByPackage = async (req, res) => {
  try {
    const { package_id } = req.params;
    const reviews = await Review.find({ package_id }).populate('user_id', 'name');
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};
