// packages import
const express = require("express");
const multer = require("multer");

// files import
const routes = require("./Routes/indexRoutes");
const sequelize = require("./Utils/database");
// const CORS = require("./Utils/CORS");

const app = express();

// middlewares

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        let profileImageName = `profileImage-${req.body.email.split("@")[0]}`;
        cb(null, profileImageName + "-" + file.originalname);
    },
});

app.use(multer({ storage: storage }).single("profileImage"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(CORS);

app.use(routes);
app.use(function (req, res) {
    res.status(404).send({
        message: "Not found",
        status: 404,
    });
});

sequelize
    .sync()
    .then((result) => {
        app.listen(4000);
    })
    .catch((err) => console.log(err));
