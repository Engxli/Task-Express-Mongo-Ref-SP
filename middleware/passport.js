const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
dotenv.config();

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const passwordMatch =
      user && (await bcrypt.compare(password, user.password));
    const error = new Error("username or password is wrong");
    error.status = 401;
    passwordMatch ? done(null, user) : done(error);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload._id);
      user ? done(null, user) : done(null, false);
    } catch (error) {
      done(error);
    }
  }
);
