const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");

//New User
router.post(
  "/users/signin",
  sanitizeBody("*")
    .trim()
    .escape(),
  function(req, res, next) {
    var name = req.body.name;
    var user = req.body.user;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    //Validation
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("username", "UserName is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Emial is not valid").isEmail();
    req.checkBody("password", "Password is required").notEmpty();
    req
      .checkBody("password2", "Passwords do not match")
      .equals(req.body.password);
    var errors = req.validationErrors();
    if (errors) {
      res.render("../", {
        errors: errors
      });
    } else {
    }
    //Redirect (piece of shit that dosnt wanna work!)
    res.redirect("../");
  }
);

module.exports = router;
