const express = require("express");
const bodyParser = require("body-parser");
const crudController = require("./Controller/crudController");

const app = express();

app.use(bodyParser.json());

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

// insert data
app.post("/add-product", crudController.postData);

// delete data
app.delete("/product-data/:id", crudController.deleteData);

app.listen(3000);
