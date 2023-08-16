const UserModel = require("../Model/userModel");

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
                    UserModel.create({
                        user_name,
                        password,
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
        console.log(req.body);
    },
};

module.exports = adminController;
