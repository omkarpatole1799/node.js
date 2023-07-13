// ===== Imports =====
const Product = require("../models/productModel");
// ===== Imports =====
// admin controllers
exports.getAddProduct = function (req, res) {
  res.render("products.ejs", {
    pageTitle: "add-products",
  });
};

exports.postAddProduct = function (req, res) {
  const product = new Product(req.body.product_name, req.body.product_price);
  product.save();
  res.redirect("/");
};

// home page controller
exports.getProductsPage = (req, res) => {
  Product.fetchAll((products) => {
    res.render("home.ejs", {
      pageTitle: "home page",
      prods: products,
    });
  });
};
