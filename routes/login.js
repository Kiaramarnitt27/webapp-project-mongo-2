const express = require("express");
const router = express.Router();

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");
router.get("/", function(req, res, next) {
  res.render("login", { title: "Log In" });
});

//New User
router.post(
  "/check",
  sanitizeBody("*")
    .trim()
    .escape(),
  function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;

    //Redirect (piece of shit that dosnt wanna work!)
    res.redirect("/login");
  }
);

module.exports = router;
