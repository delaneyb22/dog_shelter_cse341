const express = require('express');
const router = express.Router();
const Dog = require('../models/Dog');

router.get('/', async (req, res) => {
  try {
    const dogs = await Dog.find().populate('shelterId');
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id).populate('shelterId');
    if (!dog) {
      res.status(404).json({ message: 'Dog not found' });
    } else {
      res.json(dog);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ... other API endpoints for dogs ...

module.exports = router;