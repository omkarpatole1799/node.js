const fs = require('fs')
const path = require('path')

const home_controller = {
	get_index_view: function (req, res) {
		return res.render('index.ejs')
	},

	post_sequelize_script: (req, res) => {
		let script = req.body.script.toString()
		let file_name = req.body.fileName

		try {
			fs.writeFileSync(`./public/created-scripts/${file_name}.js`, script)
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
}
module.exports = home_controller
