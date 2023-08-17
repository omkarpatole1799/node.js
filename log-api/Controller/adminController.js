const UserModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
// const bcryptjs = require("bcryptjs");

const adminController = {
    postUserData: function (req, res) {
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

    getUserLogin: function (req, res) {
        const { email: user_name, password: enteredPassword } = req.body;
        UserModel.findOne({
            where: {
                user_name,
            },
        }).then((user) => {
            const { user_name, password } = user.dataValues;
            if (!user_name) {
                res.status(400).send({
                    message: "Please check your email",
                    status: 400,
                });
                return;
            }
            if (user_name) {
                bcrypt
                    .compare(enteredPassword, password)
                    .then((comparedPassword) => {
                        if (comparedPassword) {
                            res.status(200).send({
                                message: "authenticated",
                                status: 200,
                            });
                        } else {
                            res.status(400).send({
                                message: "Please check your password",
                                status: 400,
                            });
                        }
                    });
            }
        });
    },
};

module.exports = adminController;
