const express = require("express");
const multer = require("multer");

const app = express();

const adminRoutes = require("./Routes/adminRoutes");
const userRoutes = require("./Routes/userRoutes");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        let profileImageName = `profileImage-${req.body.email.split("@")[0]}`
        cb(null, profileImageName + "-" +file.originalname);
    },
});

app.use(multer({ storage: storage }).single("profileImage"));

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

app.use("/admin", adminRoutes);
// app.use("/user", userRoutes);

app.listen(4000);
