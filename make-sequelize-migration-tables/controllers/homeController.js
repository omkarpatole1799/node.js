const fs = require('fs')
const path = require('path')
const homeController = {
	getIndexView: function (req, res) {
		return res.render('index.ejs')
	},

	post_sequelize_script: (req, res) => {
		console.log(req.body, 'in controller')
		let script = req.body.script.toString()
		let fileName = req.body.fileName

		try {
			fs.writeFileSync(`./public/created-scripts/${fileName}.js`, script)
			res.status(201).json({
				success: 1,
				message: 'File has been successfully written.',
			})
		} catch (error) {
			res.status(500).json({
				success: 1,
				message: 'Something went wrong',
				data: error,
			})
		}
	},

	get_sequelize_script_file: (req, res) => {
		let fileName = req.query.fileName
		res.download(`./created-scripts/${fileName}.js`, function (err) {
			if (err) {
				return res.status(500).json({
					success: 0,
					message: 'Something went wrong.',
				})
			} else {
				fs.unlinkSync(`./created-scripts/${fileName}.js`)
			}
		})
	},
}
module.exports = homeController
