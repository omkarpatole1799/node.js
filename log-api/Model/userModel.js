const Sequelize = require("sequelize");

const sequelize = require("../Utils/database");

const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_name: {
        type: Sequelize.STRING(255), 
        allowNull: false, 
    },
    user_email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(500),
        allowNull: false,
    },
});

module.exports = User;
