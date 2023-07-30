const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const crudController = require("./Controller/crudController");

const app = express();
const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    fileName: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname + ".png");
    },
});
app.use(bodyParser.json());

// multer settings
app.use(
    multer({
        storage: multerConfig,
    }).single("inputFile")
);

// setting up CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type",
        "Authorization"
    );
    next();
});

// get data
app.get("/product-data", crudController.getData);

// get by id
app.get("/product-data/:id", crudController.getById);

// insert data
app.post("/product-data/add", crudController.postData);

// update
app.post("/product-data/update/:id", crudController.postUpdateData);

// delete data
app.delete("/product-data/delete/:id", crudController.deleteData);

// upload file only
app.post("/upload/file", function (req, res) {
    console.log(req.file);
});
app.listen(3000);
