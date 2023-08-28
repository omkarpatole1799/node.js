// packages import
const express = require("express");

// functions
const router = express.Router();

// files import
const adminController = require("../Controller/adminController");
const isAuth = require("../middleware/is-auth");

// routes

router.get("/login", isAuth, adminController.getUserLogin);
router.get("/add-log", isAuth, adminController.getAddLog);


router.post("/login", adminController.postUserLogin);

router.post("/add-user", adminController.postUserData);

router.post("/add-log", isAuth, adminController.postLogData);


module.exports = router;
