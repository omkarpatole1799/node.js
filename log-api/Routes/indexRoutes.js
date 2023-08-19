const express = require("express");

const router = express.Router();

const adminRoutes = require("./adminRoutes");
const adminController = require("../Controller/adminController");


router.post("/admin", adminRoutes);

router.get("/login", adminController.getUserLogin);
router.post("/login", adminController.postUserLogin);
module.exports = router;