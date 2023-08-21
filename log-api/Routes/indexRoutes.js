// packages import
const express = require("express");

// functions
const router = express.Router();

// files import
const adminController = require("../Controller/adminController");

// routes

router.post("/login", adminController.postUserLogin);

router.post("/add-user", adminController.postUserData);

router.post("/add-log", adminController.postLogData);

module.exports = router;
