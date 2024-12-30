const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// Routes
router.get('/', tourController.getAllTourPackages);
router.get('/:id', tourController.getTourPackageById);
router.post('/', tourController.createTourPackage);
router.put('/:id', tourController.updateTourPackage);
router.delete('/:id', tourController.deleteTourPackage);

module.exports = router;
