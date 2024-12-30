const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Review', reviewSchema);
