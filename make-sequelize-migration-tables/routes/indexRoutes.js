const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController.js')
const fs = require('fs')
const path = require('path')
router.get('/', homeController.getIndexView)

router.post('/post-sequelize-script', homeController.post_sequelize_script)

router.get('/get-sequelize-file', homeController.get_sequelize_script_file)

module.exports = router
