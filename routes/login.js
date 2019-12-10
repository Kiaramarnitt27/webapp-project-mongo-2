const express = require("express");
const router = express.Router();
const passport = require("passport");

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
    passport.authenticate("local", {
      successRedirect: "/community",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  }
);

module.exports = router;
