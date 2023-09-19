const UserModel = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

exports.addUser = function (req, res) {
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
};


