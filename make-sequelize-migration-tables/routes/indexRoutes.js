const express = require('express')
const router = express.Router()
const home_controller = require('../controllers/home_controller.js')

router.get('/', home_controller.get_index_view)

router.post('/post-sequelize-script', home_controller.post_sequelize_script)

router.get('/get-sequelize-file', home_controller.get_sequelize_script_file)

module.exports = router
