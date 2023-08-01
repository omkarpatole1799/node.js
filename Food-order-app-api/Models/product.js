const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const Product = sequelize.define("Product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    productPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    productDescription: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    productCategory: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    productImage: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

module.exports = Product;
