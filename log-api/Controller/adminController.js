const UserModel = require("../Model/userModel");
const UserLog = require("../Model/logDataModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminController = {
    postUserData: function (req, res) {
        let { email: user_name, pass: password } = req.body;

        UserModel.findOne({
            where: {
                user_name,
            },
        })
            .then((user) => {
                if (!user) {
                    bcrypt.hash(password, 12).then((hashedPassword) => {
                        console.log(hashedPassword);
                        UserModel.create({
                            user_name,
                            password: hashedPassword,
                        })
                            .then(() => {
                                res.status(201).send({
                                    message: "User Created successfully",
                                    status: 201,
                                });
                            })
                            .catch((err) => {
                                res.status(400).send({
                                    message: "User not created",
                                    status: 400,
                                });
                            });
                    });
                } else {
                    res.status(400).send({
                        message: "Email already exsist",
                        status: 400,
                    });
                }
            })
            .catch((err) => console.log(err));
    },
    postUserLogin: function (req, res) {
        const { email: user_name, pass: enteredPassword } = req.body;
        UserModel.findOne({
            where: {
                user_name,
            },
        }).then((user) => {
            if (user !== null) {
                const { user_name, password } = user.dataValues;
                if (user_name) {
                    bcrypt
                        .compare(enteredPassword, password)
                        .then((comparedPassword) => {
                            if (comparedPassword) {
                                const tocken = jwt.sign(
                                    {
                                        email: user_name,
                                    },
                                    "secrtkey",
                                    { expiresIn: "1h" }
                                );

                                res.status(200).json({
                                    message: "authenticated",
                                    tocken,
                                });
                            } else {
                                res.status(401).json({
                                    message: "Wrong password!",
                                });
                            }
                        });
                }
            } else {
                res.status(401).json({
                    message: "Wrong email!",
                });
            }
        });
    },
    postLogData: function (req, res) {
        const { logInfo } = req.body;
        console.log(logInfo);
        UserLog.create({
            logInfo,
        })
            .then((result) => {
                res.status(201).json({
                    message: "successfully added log",
                    status: 201,
                });
            })
            .catch((err) => console.log(err));
    },
};

module.exports = adminController;
