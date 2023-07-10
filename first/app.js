const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const products = [];

// setting up templating engine
app.set("view engine", "pug");

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

// serve custom js and css files
app.use(express.static(path.join(__dirname, "public")));

// products page
app.get("/products", function (req, res) {
  // res.sendFile(path.join(__dirname, "views", "products.html"));
  res.render(path.join(__dirname, "views", "products.pug"));
});

// add product
app.post("/products", function (req, res) {
  products.push({ product_name: req.body.product_name });
  console.log(products);
  res.redirect("/");
});

// home page
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "views", "home.html"));
  res.render(path.join(__dirname, "views", "home.pug"), {
    prods: products,
    title: "Shop",
  });
});

// 404 page
app.use(function (req, res) {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.render(path.join(__dirname, "views", "404.pug"));
});

app.listen(3000);
