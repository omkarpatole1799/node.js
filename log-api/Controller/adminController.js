const UserModel = require("../Model/userModel");

const adminController = {
    postUserData: function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let userType = req.body.userType;
        let profileImage = req.file;

        UserModel.create({
            user_name: email,
            password,
            type: userType,
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
    },
};

module.exports = adminController;
