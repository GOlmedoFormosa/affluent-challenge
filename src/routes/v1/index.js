const express = require('express');

const userRoutes = require('./users');
const datesRoutes = require('./dates');
const router = express.Router();

router.use('/users', userRoutes);
router.use('/dates', datesRoutes);

module.exports = router;