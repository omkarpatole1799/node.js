const express = require("express");

const router = express.Router();

const adminRoutes = require("./adminRoutes");
const adminController = require("../Controller/adminController");


router.post("/admin", adminRoutes);

router.post("/login", adminController.getUserLogin);

module.exports = router;