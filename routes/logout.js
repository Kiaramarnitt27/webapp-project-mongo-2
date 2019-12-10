const express = require("express");
const router = express.Router();
//Logout
router.get("/", function(req, res, next) {
  req.app.set("user", null);
  res.redirect("../");
});

module.exports = router;
