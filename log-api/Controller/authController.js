const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../Model/userModel');

exports.postUserLogin = function (req, res) {
  const { user_email, pass: enteredPassword } = req.body;
  console.log(req.body);
  UserModel.findOne({
    where: {
      user_email,
    },
  }).then((user) => {
    if (user !== null) {
      const { id, user_name, password, user_type } = user.dataValues;
      if (user_name) {
        bcrypt.compare(enteredPassword, password).then((comparedPassword) => {
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
};
