const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Register user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new mongoose.model('User ', { username, password: hashedPassword });
  try {
    await user.save();
    res.status(201).send({ message: 'User  created successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error creating user' });
  }
});




// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await mongoose.model('User ').findOne({ username });
  if (!user) {
    res.status(401).send({ message: 'Invalid username or password' });
  } else {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).send({ message: 'Invalid username or password' });
    } else {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.status(200).send({ token });
    }
  }
});

// Logout user
router.post('/logout', async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(401).send({ message: 'Unauthorized' });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: 'Invalid token' });
        } else {
          res.status(200).send({ message: 'Logged out successfully' });
        }
      });
    }
  });
  