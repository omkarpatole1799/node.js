const express = require("express");

const router = express.Router();

const adminRoutes = require("./adminRoutes");
const adminController = require("../Controller/adminController");


router.use("/admin", adminRoutes);

router.use("/login", adminController.getUserLogin);

module.exports = router;