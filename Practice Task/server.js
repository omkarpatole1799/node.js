const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productController = require("./Controller/productsController");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", productController.getProducts);

app.get("/add-product", function (req, res) {
  res.render("form.ejs");
});

app.post("/add-product", productController.postProduct);

// delete the entry
app.get("/delete/:id", productController.deleteProduct);

// edit the entry
app.post("/edit/:id", productController.editProduct);

app.listen(3000);
