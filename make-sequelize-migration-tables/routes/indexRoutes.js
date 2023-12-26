const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController.js')
const fs = require('fs')
const path = require('path')
router.get('/', homeController.getIndexView)

router.post('/post-sequelize-script', (req, res) => {
	console.log(req.body, 'in controller')
	let script = req.body.script
	let fileName = req.body.fileName
	fs.writeFile('./script.js', 'hello world!', function (err) {
		if (err) {
			console.log(err)
		}
		console.log('success')
	})
	// fs.writeFileSync(
	// 	path.join(__dirname, 'public', 'created-scripts', `migrationScript.js`),
	// 	script
	// )
	// res.status(201).json({
	// 	success: 1,
	// 	message: 'File has been successfully written.',
	// })
})

router.get('/get-sequelize-file', (req, res) => {
	console.log('downloading file')
	res.download(
		path.join(__dirname, 'public', 'created-scripts', 'migrationScript.js'),
		function (err) {
			if (err) {
				console.log('error occured')
			} else {
				fs.unlinkSync(
					path.join(
						__dirname,
						'public',
						'created-scripts',
						'migrationScript.js'
					)
				)
			}
		}
	)
})

module.exports = router
