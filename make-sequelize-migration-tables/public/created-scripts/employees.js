
			const Sequelize = require('sequelize')	
			const sequelize = require('../../application/config/db.connect.js')

			const employees = sequelize.define('employees', {
				id:{ 
					type:Sequelize.INTEGER, 
					allowNull: false, 
					primaryKey: true, 
					autoIncrement: true
				},
				
			f_name : {
				type: Sequelize.STRING(255), 
				allowNull: true
			},
			
			l_name : {
				type: Sequelize.STRING(255), 
				allowNull: true
			},
			
			mobile_number : {
				type: Sequelize.STRING(255), 
				allowNull: true
			},
				
			})
			module.exports = employees
		