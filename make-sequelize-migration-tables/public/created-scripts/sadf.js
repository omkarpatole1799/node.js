
			const Sequelize = require('sequelize')	
			const sequelize = require('../../application/config/db.connect.js')

			const sadf = sequelize.define('sadf', {
				id:{ 
					type:Sequelize.INTEGER, 
					allowNull: false, 
					primaryKey: true, 
					autoIncrement: true
				},
					
			})
			module.exports = sadf
		