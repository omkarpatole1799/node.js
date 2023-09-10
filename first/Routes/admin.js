// ===== Imports =====
const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");
// ===== Imports =====

// products page
router.get("/admin/add-products", productsController.getAddProduct);

// add product
router.post("/admin/add-products", productsController.postAddProduct);

module.exports = router