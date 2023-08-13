const Product = require("../Models/productModel");

const productController = {
    postAddProduct: (req, res) => {
        let productName = req.body.productName;
        let productPrice = req.body.productPrice;
        let productDescription = req.body.productDescription;
        let productCategory = req.body.productDescription;
        let productImage = req.body.productImage;

        Product.create({
            productName,
            productPrice,
            productDescription,
            productCategory,
        })
            .then(() => {
                res.status(201).send({
                    message: "Product added successfully",
                });
            })
            .catch((err) => console.log(err));
    },
};

module.exports = productController;
