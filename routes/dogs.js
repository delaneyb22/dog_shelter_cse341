const express = require('express');
const router = express.Router();
const Dog = require('../routes/dogs');
//troubleshooting here
//const dogsController = require('../controller/dogs');

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

// Create a new dog
router.post('/', async (req, res) => {
  const { name, breed, age, shelterId } = req.body;

  // Basic validation
  if (!name || !breed || !age || !shelterId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const dog = new Dog({
    name,
    breed,
    age,
    shelterId,
  });

  try {
    const newDog = await dog.save();
    res.status(201).json(newDog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing dog
router.put('/:id', async (req, res) => {
  const { name, breed, age, shelterId } = req.body;

  // Basic validation
  if (!name || !breed || !age || !shelterId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const dog = await Dog.findByIdAndUpdate(req.params.id, {
      name,
      breed,
      age,
      shelterId,
    }, { new: true });

    if (!dog) {
      return res.status(404).json({ message: 'Dog not found' });
    }

    res.json(dog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a dog
router.delete('/:id', async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    if (!dog) {
      return res.status(404).json({ message: 'Dog not found' });
    }
    res.json({ message: 'Dog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;