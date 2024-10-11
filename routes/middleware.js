const express = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).send({ message: 'Unauthorized' });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token' });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

router.get('/protected', verifyToken, async (req, res) => {
    // This route is only accessible if the user is logged in
    res.status(200).send({ message: 'Welcome, authenticated user!' });
  });