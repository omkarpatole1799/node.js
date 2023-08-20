const UserModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminController = {
    postUserData: function (req, res) {
        console.log("posting user data", req.body);

        let { email: user_name, password: password, userType: type } = req.body;

        UserModel.findOne({
            where: {
                user_name: user_name,
            },
        })
            .then((user) => {
                if (!user) {
                    bcrypt.hash(password, 12).then((hashedPassword) => {
                        console.log(hashedPassword);
                        UserModel.create({
                            user_name,
                            password: hashedPassword,
                            type,
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
        const { email: user_name, password: enteredPassword } = req.body;
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
                                    status: 200,
                                    tocken,
                                });
                            } else {
                                res.status(400).json({
                                    message: "Wrong password!",
                                    status: 400,
                                });
                            }
                        });
                }
            } else {
                res.status(400).json({
                    message: "Wrong email!",
                    status: 400,
                });
            }
        });
    },
};

module.exports = adminController;
