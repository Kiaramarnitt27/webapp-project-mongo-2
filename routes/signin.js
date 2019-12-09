const express = require("express");
const router = express.Router();
const User = require("../models/db");

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");
router.get("/", function(req, res, next) {
  res.render("signin", { title: "Sign In" });
});

//New User
router.post(
  "/create",
  sanitizeBody("*")
    .trim()
    .escape(),
  function(req, res, next) {
    const { name, username, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !username || !email || !password || !password2) {
      errors.push({ msg: "Please enter all fields" });
    }

    if (password !== password2) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 8) {
      errors.push({ msg: "Password must be at least 8 characters" });
    }

    if (errors.length > 0) {
      res.render("signin", {
        errors,
        name,
        username,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: "Email already exists" });
          res.render("signin", {
            errors,
            name,
            username,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            username,
            email,
            password
          });
        }
      });
    }
  }
);

module.exports = router;
