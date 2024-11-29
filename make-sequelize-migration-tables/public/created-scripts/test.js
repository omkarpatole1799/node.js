const Sequelize = require("sequelize")
const sequelize = require("../config/db-connect-migration.js")

const test = sequelize.define("test", {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},

	f_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},

	m_name: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
})
module.exports = test
