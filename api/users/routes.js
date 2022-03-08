const express = require("express");
const { singup, getUsers, signin } = require("./controller");
const passport = require("passport");

const router = express.Router();

router.get("/", getUsers);
router.post("/singup", singup);
router.post(
  "/singin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
