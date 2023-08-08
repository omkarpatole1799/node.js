const adminModel = require("../Model/adminModel");

const adminController = {
    postUserData: function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let userType = req.body.userType;
        let profileImage = req.file;

        adminModel
            .getByEmail(email)
            .then((data) => {
                console.log(data);
                if (data[0].length > 1) {
                    res.status(409).send({
                        message: "User already exsist",
                    });
                } else {
                    adminModel
                        .postUserData(
                            email,
                            password,
                            userType,
                            profileImage.path
                        )
                        .then(() => {
                            res.status(201).send({
                                message: "User successfully created",
                            });
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    },
};

module.exports = adminController;
