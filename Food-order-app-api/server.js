// packages import
const express = require("express");
const multer = require("multer");

// files import
const sequelize = require("./Models/productModel");
const routes = require("./Routes/indexRoute");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Public/Images");
    },
    filename: function (req, file, cb) {
        cb(null, "image" + Math.random().toFixed(5) + file.originalname);
    },
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({storage: storage}).single("productImage"));
app.use(routes);

sequelize
    .sync()
    .then((result) => {
        app.listen(4000);
    })
    .catch((err) => console.log(err));
