const express = require('express');
const router = express.Router();
const dog = require('./dogs');

router.use('/', require('./swagger'));
router.get('/dogs', dog.getDogs);
router.get('/dogs/:id', dog.getDog);
//router.use('/shelters', require('./shelters'));
//router.use('/users', require('./users'));
//router.use('/auth', require('./auth'));

module.exports = router;