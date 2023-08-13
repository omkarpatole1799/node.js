const express = require("express");
const router = express.Router();

const productController = require("../Controller/productController");

const routes = {
    postAddProduct: function () {
        router.post("/add-product", productController.postAddProduct);
    },
};

module.exports = routes;
