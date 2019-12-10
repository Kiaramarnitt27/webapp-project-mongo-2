// Required libraries
var express = require("express");
var router = express.Router();

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");

// Get posts listing
router.get("/", function(req, res, next) {
  // Retreiving the posts from the global var
  var authors_and_posts = [];
  var poststore = req.app.get("poststore");
  var curr_user = req.app.get("user");
  //Verify there is account logged in
  if (!curr_user) {
    res.redirect("../");
  }
  //Reverse posts order
  for (var i = poststore.length - 1; i > -1; i--) {
    authors_and_posts.push({
      author: poststore[i].author,
      content: poststore[i].content
    });
  }
  // Just send the array of objects to the browser
  res.render("posts", {
    title: "Community Posts",
    username: curr_user,
    post_list: authors_and_posts
  });
});

//Create new post
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
    //Check that there is content in post
    if (!local_content) {
      res.render("/posts");
    } else {
      //Save new post
      req.app.get("poststore").push({
        author: curr_user,
        content: local_content
      });
    }
    res.redirect("/posts");
  }
);

module.exports = router;
