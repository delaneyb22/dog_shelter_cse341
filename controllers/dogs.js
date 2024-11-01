const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { body, validationResult } = require('express-validator');

// Middleware for validation
const validateDog = [
  body('name').notEmpty().withMessage('Name is required'),
  body('breed').notEmpty().withMessage('Breed is required'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  body('size').notEmpty().withMessage('Size is required'),
  body('description').optional().isString(),
  body('shelterId').notEmpty().withMessage('Shelter ID is required'),
];

const getAllDogs = async (req, res) => {
  //#swagger.tags=['Dogs']
  try {
    const result = await mongodb.getDatabase().db().collection('dogs').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve dogs', error: error.message });
  }
};

const getSingleDog = async (req, res) => {
  //#swagger.tags=['Dogs']
  try {
    const dogId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('dogs').find({ _id: dogId }).toArray();
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Dog not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve dog', error: error.message });
  }
};

const createDog = async (req, res) => {
  //#swagger.tags=['Dogs']
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const dog = {
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age,
    size: req.body.size,
    description: req.body.description,
    shelterId: req.body.shelterId,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('dogs').insertOne(dog);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Dog created successfully', id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create dog' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error occurred while creating the dog', error: error.message });
  }
};

const updateDog = async (req, res) => {
  //#swagger.tags=['Dogs']
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const dogId = new ObjectId(req.params.id);
  const dog = {
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age,
    size: req.body.size,
    description: req.body.description,
    shelterId: req.body.shelterId,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('dogs').replaceOne({ _id: dogId }, dog);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Dog updated successfully' });
    } else {
      res.status(404).json({ message: 'Dog not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error occurred while updating the dog', error: error.message });
  }
}