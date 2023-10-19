const UserModel = require('../Model/userModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

// exports.addUser = function (req, res) {
//   let {
//     userName,
//     userEmail,
//     pass: password,
//     userType
//   } = req.body;
//   UserModel.findOne({
//     where: {
//       userEmail
//     }
//   })
//     .then((user) => {
//       if (!user) {
//         bcrypt.hash(password, 12).then((hashedPassword) => {
//           UserModel.create({
//             userName,
//             userEmail,
//             password: hashedPassword,
//             userType // 1 for admin and 2 for local user
//           })
//             .then(() => {
//               res.status(201).json({
//                 message: 'User Created successfully',
//                 status: 201
//               });
//             })
//             .catch((err) => {
//               res.status(400).json({
//                 message: 'User not created',
//                 status: 400
//               });
//             });
//         });
//       } else {
//         res.status(400).json({
//           message: 'Email already exsist',
//           status: 400
//         });
//       }
//     })
//     .catch((err) => console.log(err));
// };

exports.addUser = async (req, res) => {
  let {
    userName,
    userEmail,
    pass: password,
    userType
  } = req.body;
  let user = await UserModel.findOne({
    where: { userEmail }
  });

  if (user) {
    return res.status(400).json({
      message: 'Email already exsist',
      status: 400
    });
  }

  let hashedPassword = await hashPassword(password);

  await createUser(
    userName,
    userEmail,
    hashedPassword,
    userType
  );

  res.status(201).json({
    message: 'User Created successfully',
    status: 201
  });
};

async function hashPassword(password) {
  // RETURNS hashedPassword
  return await bcrypt.hash(password, 12);
}

async function createUser(
  userName,
  userEmail,
  hashedPassword,
  userType
) {
  // RETURN CREATE USER
  return (
    await UserModel.create({
      userName,
      userEmail,
      password: hashedPassword,
      userType // 1 for admin user and 2 for employee user
    })
  ).get({ plain: true });
}
