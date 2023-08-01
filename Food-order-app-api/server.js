const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./Models/product");
const Product = require("./Models/product");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/product/get", function (req, res) {
    Product.findAll()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => console.log(err));
});

app.post("/product/add", function (req, res) {
    console.log(req.body);
    let productName = req.body.productName;
    let productPrice = req.body.productPrice;
    let productDescription = req.body.productDescription;
    let productCategory = req.body.productCategory;
    Product.create({
        productName,
        productPrice,
        productDescription,
        productCategory,
        productImage: "image",
    })
        .then(() => {
            res.status(201).send({
                status: 201,
                message: "Success uploading data",
            });
        })
        .catch((err) =>
            res.status(400).send({
                status: 400,
                message: "Error uploading data",
            })
        );
});

sequelize
    .sync()
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));
