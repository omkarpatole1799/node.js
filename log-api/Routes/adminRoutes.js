const express = require('express');
const router = express.Router();
const { addUser } = require('../Controller/adminController');

router.post('/addUser', addUser);

module.exports = router;
