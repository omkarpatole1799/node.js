const Sequelize = require("sequelize");

const sequelize = new Sequelize("food-order-app", "root", "1111", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
