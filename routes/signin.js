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
    //Retrieve sing in info
    const { username, email, password, password2 } = req.body;
    let signin_errors = [];
    //Check Validation
    if (!username || !password || !password2) {
      signin_errors.push({ msg: "Please enter username" });
    }

    if (!email || !password || !password2) {
      signin_errors.push({ msg: "Please enter email" });
    }

    if (password !== password2) {
      signin_errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 8) {
      signin_errors.push({ msg: "Password must be at least 8 characters" });
    }

    if (signin_errors.length > 0) {
      res.render("signin", {
        signin_errors,
        username,
        email,
        password,
        password2
      });
    } else {
      req.app.get("userstore").push({
        username: username,
        email: email,
        password: password
      });

      console.log("New User saved");
      res.redirect("/login");
    }
  }
);

module.exports = router;
