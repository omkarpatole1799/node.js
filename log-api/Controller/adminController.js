const UserModel = require('../Model/userModel');
const UserLog = require('../Model/logDataModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config();

const adminController = {
    postUserData: function (req, res) {
        let { user_name, user_email, pass: password, user_type } = req.body;

        UserModel.findOne({
            where: {
                user_email,
            },
        })
            .then((user) => {
                if (!user) {
                    bcrypt.hash(password, 12).then((hashedPassword) => {
                        UserModel.create({
                            user_name,
                            user_email,
                            password: hashedPassword,
                            user_type, // 1 for admin and 2 for local user
                        })
                            .then(() => {
                                res.status(201).send({
                                    message: 'User Created successfully',
                                    status: 201,
                                });
                            })
                            .catch((err) => {
                                res.status(400).send({
                                    message: 'User not created',
                                    status: 400,
                                });
                            });
                    });
                } else {
                    res.status(400).send({
                        message: 'Email already exsist',
                        status: 400,
                    });
                }
            })
            .catch((err) => console.log(err));
    },
    getUserLogin: function (req, res, next) {
        res.status(200).json({
            call: 1,
        });
    },
    postUserLogin: function (req, res) {
        const { user_email, pass: enteredPassword } = req.body;
        UserModel.findOne({
            where: {
                user_email,
            },
        }).then((user) => {
            if (user !== null) {
                const { id, user_name, password, user_type } = user.dataValues;
                if (user_name) {
                    bcrypt
                        .compare(enteredPassword, password)
                        .then((comparedPassword) => {
                            if (comparedPassword) {
                                const tocken = jwt.sign(
                                    {
                                        user_email,
                                        userId: id,
                                    },
                                    `${process.env.JWT_SECRET}`,
                                    { expiresIn: '1h' }
                                );

                                res.status(200).json({
                                    message: 'authenticated',
                                    tocken,
                                    userId: id,
                                    user_name,
                                    user_type,
                                });
                            } else {
                                res.status(401).json({
                                    message: 'Incorret Password',
                                });
                            }
                        });
                }
            } else {
                res.status(401).json({
                    message: 'Incorrect Email',
                });
            }
        });
    },
    getAddLog: function (req, res) {
        res.status(200).json({
            call: 1,
        });
    },
    postLogData: function (req, res) {
        console.log(req.body);
        const { log, projectTitle } = req.body;
        const userId = req.userId;
        UserLog.create({
            logInfo: log,
            projectTitle,
            UserId: userId,
        })
            .then((result) => {
                res.status(201).json({
                    message: 'successfully added log',
                    status: 201,
                });
            })
            .catch((err) => console.log(err));
    },
    getLogList: function (req, res) {
        console.log(req.params);
        const { userId } = req.params;
        console.log('======================================');
        UserLog.findAll()
            .then((result) => {
                console.log(result);
            })
            .catch((err) => console.log(err));
    },
};

module.exports = adminController;
