const express = require("express");
const router = express.Router();

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
    var name = req.body.name;
    var user = req.body.user;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Redirect (piece of shit that dosnt wanna work!)
    res.redirect("/signin");
  }
);

module.exports = router;
