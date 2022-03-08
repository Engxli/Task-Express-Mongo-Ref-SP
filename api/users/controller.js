const Users = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

exports.singup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await Users.create(req.body);

    const payLoad = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + +process.env.EXPTIMER, //2hr
    };

    const token = jwt.sign(JSON.stringify(payLoad), process.env.SECRET_KEY);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  try {
    const newUser = req.user;

    const payLoad = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + +process.env.EXPTIMER, //2hr
    };

    const token = jwt.sign(JSON.stringify(payLoad), process.env.SECRET_KEY);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
