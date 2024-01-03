
			const Sequelize = require('sequelize')	
			const sequelize = require('../../application/config/db.connect.js')

			const asf = sequelize.define('asf', {
				id:{ 
					type:Sequelize.INTEGER, 
					allowNull: false, 
					primaryKey: true, 
					autoIncrement: true
				},
					
			})
			module.exports = asf
		