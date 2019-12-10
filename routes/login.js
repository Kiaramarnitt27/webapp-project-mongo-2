const express = require("express");
const router = express.Router();

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");
router.get("/", function(req, res, next) {
  res.render("login", { title: "Log In" });
});

router.post(
  "/check",
  sanitizeBody("*")
    .trim()
    .escape(),
  function(req, res, next) {
    var users_and_info = req.app.get("userstore");
    var login_username = req.body.username;
    var login_password = req.body.password;

    for (var i = 0; i < users_and_info.length; i++) {
      if (
        users_and_info[i].username === login_username &&
        users_and_info[i].password === login_password
      ) {
        req.app.set("user", login_username);
        res.redirect("/posts");
      }
    }
    res.render("login", {
      message: "Wrong username or password"
    });
  }
);

module.exports = router;
