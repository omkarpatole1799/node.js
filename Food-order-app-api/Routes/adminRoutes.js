const express = require("express");
const router = express.Router();

const productController = require("../Controller/productController");

router.use("/add-product", productController.postAddProduct);

module.exports = router;