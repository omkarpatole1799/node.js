// ===== Imports =====
const Product = require("../models/product");
// ===== Imports =====
// admin controllers
exports.getAddProduct = function (req, res) {
  res.render("products.ejs", {
    pageTitle: "add-products",
  });
};

exports.postAddProduct = function (req, res) {
  const product = new Product(req.body.product_name);
  product.save();
  res.redirect("/");
};

// home page controller
exports.getProductsPage = (req, res) => {
  const products = Product.fetchAll();
  res.render("home.ejs", {
    pageTitle: "home page",
    prods: products,
  });
};
