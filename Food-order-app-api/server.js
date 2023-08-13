const express = require("express");
const sequelize = require("./Models/productModel");

const routes = require("./Routes/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

sequelize
    .sync()
    .then((result) => {
        app.listen(4000);
    })
    .catch((err) => console.log(err));
