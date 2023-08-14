const Sequelize = require("sequelize");

const sequelize = new Sequelize("logdb", "root", "1111", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
