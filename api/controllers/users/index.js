const bcrypt = require('bcrypt');
const saltRounds = 10;
const { omit } = require('lodash');

const { hash, compare } = bcrypt;

exports.signup = async (req, res) => {
  const { db } = res.locals;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      errors: [{
        value: '*****',
        msg: "Password should equal password confirm",
        param: "password",
        location: "body"
      }]
    });
  }
  const hashedPassword = await hash(password, saltRounds);

  const completedUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword
  }


  try {
    const result = await db.collection('users').insert(completedUser)

    const user = result.ops[0];

    const responseUser = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    }

    res.send({
      message: 'Successful signup',
      payload: responseUser
    });
  } catch (error) {
    if (error.code === 11000) {
      const errors = [{
        value: req.body.email,
        msg: "A user with these credentials already exists",
        param: "email",
        location: "body"
      }]
      return res.status(400).json({ errors: errors })
    }
      res.send(error);
  }
};

exports.signin = async (req, res) => {
  const { db } = res.locals;
  const user = await db.collection('users').findOne({ email: req.body.email });
  const password = req.body.password;

  if (!user) {
    return res.status(400).json({
      errors: [{
        value: req.body,
        msg: "No user exists with these credentials",
        param: "email | password",
        location: "body"
      }]
    });
  }

  const compareResult = await compare(password, user.password);
  if (!compareResult) {
    return res.status(400).json({
      errors: [{
        value: req.body,
        msg: "No user exists with these credentials",
        param: "email | password",
        location: "body"
      }]
    });
  }

  const safeUser = omit(user, 'password');

  res.send({
    message: 'Successful signin',
    payload: safeUser,
  });
};
