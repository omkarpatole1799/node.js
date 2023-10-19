const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const isAuth = require('../middleware/is-auth');

// ROUTES
router.use('/auth', authRoutes);
router.use('/admin', isAuth, adminRoutes);
router.use('/user', isAuth, userRoutes);

module.exports = router;
