const express = require('express');
const router = express.Router();
const { addUser } = require('../Controller/adminController');

router.post('/add-employee', addUser);

module.exports = router;
