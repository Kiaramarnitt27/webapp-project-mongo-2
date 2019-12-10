// Required libraries
var express = require("express");
var router = express.Router();

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");

// Get posts listing
router.get("/", function(req, res, next) {
  // Retreiving the posts from the global var
  var authors_and_posts = req.app.get("poststore");
  var curr_user = req.app.get("user");

  if (!curr_user) {
    res.redirect("../");
  }

  var myposts = [];
  for (var i = 0; i < authors_and_posts.length; i++) {
    if (authors_and_posts[i].author === curr_user) {
      myposts.push({
        author: curr_user,
        content: authors_and_posts[i].content
      });
    }
  }
  // Just send the array of objects to the browser
  res.render("mypage", {
    title: "My Page",
    username: curr_user,
    post_list: myposts
  });
});

// Sanitation middleware
// See https://express-validator.github.io/docs/sanitization-chain-api.html
// And https://express-validator.github.io/docs/filter-api.html
router.post(
  "/create",
  sanitizeBody("*")
    .trim()
    .escape(),
  function(req, res, next) {
    var local_content = req.body.content;
    var curr_user = req.app.get("user");
    console.log("We got content: " + local_content);
    console.log("from author: " + curr_user);

    if (!local_content) {
      res.render("/mypage");
    } else {
      req.app.get("poststore").push({
        author: curr_user,
        content: local_content
      });
    }
    res.redirect("/mypage");
  }
);

module.exports = router;
