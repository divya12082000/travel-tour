const validateTourPackage = (req, res, next) => {
    const { title, destination, price_per_person, duration_days, start_date, end_date, itinerary, inclusions, exclusions } = req.body;
  
    if (!title || !destination || !price_per_person || !duration_days || !start_date || !end_date || !itinerary || !inclusions || !exclusions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    next();
  };
  
  module.exports = validateTourPackage;
  