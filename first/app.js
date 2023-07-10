const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// bodyparser
app.use(bodyParser.urlencoded({extended: false}));

// serve custom js and css files
app.use(express.static(path.join(__dirname, "public")));

// products page
app.get("/products", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "products.html"));
});

// add product
app.post("/products", function (req, res) {
  // const formValue = req.body.
  console.log(req.body);
  res.redirect("/");
});

// home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// 404 page
app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
