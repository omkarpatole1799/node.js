const express = require("express");
const path = require("path");
const app = express();

// serve custom js and css files
app.use(express.static(path.join(__dirname, "public")));

// products page
app.get("/products", function (req, res, next) {
  res.sendFile(path.join(__dirname, "views", "products.html"));
});

// home page
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// 404 page
app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3030);
