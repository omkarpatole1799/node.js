const productsModel = require("../Models/productsModel");

exports.getProducts = function (req, res) {
  productsModel
    .getData()
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postProduct = function (req, res) {
  let name = req.body.itemName;
  let price = req.body.itemPrice;
  let description = req.body.itemDescription;
  productsModel
    .postData(name, price, description)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = function (req, res) {
  let id = req.params.id;
  productsModel
    .deleteData(id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.editProduct = function (req, res) {
  let id = req.params.id;
  productsModel
    .getDataFromId(id)
    .then(([data]) => {
      res.render("form.ejs", {
        itemData: data[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
