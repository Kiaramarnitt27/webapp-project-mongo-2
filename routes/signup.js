const express = require("express");
const router = express.Router();

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");

router.get("/", function(req, res, next) {
  res.render("signup", { title: "Sign Up" });
});

//New User
router.post(
  "/create",
  sanitizeBody("*")
    .trim()
    .escape(),
  function(req, res, next) {
    //Retrieve sing up info
    const { username, email, password, password2 } = req.body;
    var users = req.app.get("userstore");
    let signup_errors = [];
    //Check Validation
    if (!username || !password || !password2) {
      signup_errors.push({ msg: "Please enter username" });
    }

    if (!email || !password || !password2) {
      signup_errors.push({ msg: "Please enter email" });
    }

    if (password !== password2) {
      signup_errors.push({ msg: "Passwords do not match" });
    }

    if (password.length < 8) {
      signup_errors.push({ msg: "Password must be at least 8 characters" });
    }
    //Check if username or email are already in storage
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        signup_errors.push({ msg: "Username already exists" });
      }
      if (users[i].email === email) {
        signup_errors.push({ msg: "Email already has an account" });
      }
    }
    //Send errors to browser
    if (signup_errors.length > 0) {
      res.render("signup", {
        signup_errors,
        username,
        email,
        password,
        password2
      });
    } else {
      //Save new User
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
