// ===== Imports =====
const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");
// ===== Imports =====

// home page

router.get("/", productsController.getProductsPage);

module.exports = router;