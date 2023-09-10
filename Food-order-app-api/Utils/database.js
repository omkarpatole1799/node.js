const Sequelize = require("sequelize");

const sequelize = new Sequelize("food_app_db", "root", "1111", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
