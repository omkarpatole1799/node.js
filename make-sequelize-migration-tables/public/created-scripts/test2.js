
			const Sequelize = require('sequelize')	
			const sequelize = require('../config/db-connect-migration.js')

			const test2 = sequelize.define('test2', {
				id:{ 
					type:Sequelize.INTEGER, 
					allowNull: false, 
					primaryKey: true, 
					autoIncrement: true
				},
				
			id : {
				type: Sequelize.INTEGER, 
				allowNull: false
			},
			
			 f_name : {
				type: Sequelize.INTEGER, 
				allowNull: false
			},
			
			 l_name : {
				type: Sequelize.INTEGER, 
				allowNull: false
			},
				
			})
			module.exports = test2
		