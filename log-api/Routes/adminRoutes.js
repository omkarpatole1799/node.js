const express = require("express");

const router = express.Router();

router.get("/", function(req,res){
    console.log("hello from admin")
})

module.exports = router;