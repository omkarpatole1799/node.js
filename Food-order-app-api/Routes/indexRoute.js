const express = require("express");

const adminRoutes = require("./adminRoutes");

const router = express.Router();

router.use("/admin", adminRoutes);

module.exports = router;