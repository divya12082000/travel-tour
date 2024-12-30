const express = require('express');
const { addReview, getReviewsByPackage } = require('../controllers/reviewController');

const router = express.Router();

// Add a review
router.post('/', addReview);

// Get reviews for a specific package
router.get('/:package_id', getReviewsByPackage);

module.exports = router;
