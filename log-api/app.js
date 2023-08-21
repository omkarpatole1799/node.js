// packages import
const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

// files import
const indexRoutes = require("./Routes/indexRoutes");
const sequelize = require("./Utils/database");

// sequelize models import
const User = require("./Model/userModel");
const UserLog = require("./Model/logDataModel");

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

app.use("/", indexRoutes);
app.use(function (req, res) {
    res.status(404).send({
        message: "Route Not found",
        status: 404,
    });
});

// sequelize associations
UserLog.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(UserLog);

sequelize
    // .sync({ force: true })
    .sync()
    .then((result) => {
        app.listen(`${process.env.PORT}`, () => {
            console.log("app running on port", process.env.PORT);
        });
    })
    .catch((err) => console.log(err));
