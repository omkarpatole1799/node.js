const products = [];

// admin controllers
exports.getAddProduct = function (req, res) {
  res.render("products.ejs", {
    pageTitle: "add-products",
  });
};

exports.postAddProduct = function (req, res) {
  products.push({ product_name: req.body.product_name });
  console.log(products);
  res.redirect("/");
};

// home page controller
exports.getProductsPage = (req, res) => {
  res.render("home.ejs", {
    pageTitle: "home page",
    prods: products,
  });
};
