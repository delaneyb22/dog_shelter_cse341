const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/dogs', require('./dogs'));
//router.use('/shelters', require('./shelters'));
//router.use('/users', require('./users'));
//router.use('/auth', require('./auth'));

module.exports = router;