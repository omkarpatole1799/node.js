const express = require("express");
const router = express.Router();

const adminController = require("../Controller/adminController");

router.post("/add-user", adminController.postUserData);

module.exports = router;
