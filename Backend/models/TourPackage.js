const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  price_per_person: { type: Number, required: true },
  duration_days: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  itinerary: { type: [String], required: true },
  inclusions: { type: [String], required: true },
  exclusions: { type: [String], required: true },
  images: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TourPackage', tourPackageSchema);
