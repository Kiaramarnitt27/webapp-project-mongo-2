var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  //Check if there is a current account logged in
  var curr_user = req.session.user;
  if (curr_user) {
    res.redirect("../posts");
  }
  res.render("index", { title: "LUT-Blog" });
});

module.exports = router;
