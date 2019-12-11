// Required libraries
var express = require("express");
var router = express.Router();

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");

// Get posts listing
router.get("/", function(req, res, next) {
  // Retreiving the posts from the global var
  var authors_and_posts = req.app.get("poststore");
  var curr_user = req.session.user;
  //Verify there is account logged in
  if (!curr_user) {
    res.redirect("../");
  }
  //Select only user posts
  var myposts = [];
  for (var i = authors_and_posts.length - 1; i > -1; i--) {
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

// Crete new post
router.post(
  "/create",
  sanitizeBody("*")
    .trim()
    .escape(),
  function(req, res, next) {
    var local_content = req.body.content;
    var curr_user = req.session.user;
    console.log("We got content: " + local_content);
    console.log("from author: " + curr_user);
    //Check that there is content in post
    if (!local_content) {
      res.render("/mypage");
    } else {
      //Save new post
      req.app.get("poststore").push({
        author: curr_user,
        content: local_content
      });
    }
    res.redirect("/mypage");
  }
);

module.exports = router;
