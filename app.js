// Require libraries (edit as required)
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
//body parser??
var logger = require("morgan");
var expressValidator = require("express-session");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local"),
  Strategy;
var mongoose = require("mongoose");

// Include external files (edit as required)
var indexRouter = require("./routes/index");
var postsRouter = require("./routes/posts");
var mypageRouter = require("./routes/mypage");

// Start the app itself - default
var app = express();

// view engine setup  - default
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Use logging and set settings - default
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Define routes (edit as required)
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/mypage", mypageRouter);

// Setting up a global var for data storage - this is extremely poor and hacky way, but works

app.set("poststore", []);
app.set("user");
//To be changed with MongoDB
mongoose.connect(
  "mongodb+srv://user:<lut2019>@webapp-wvh1z.mongodb.net/test?retryWrites=true&w=majority"
);
var db = mongoose.connection;

//Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

//Passport Init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator??

//Connect Flash
app.use(flash());
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Catch 404 and forward to error handler - default
app.use(function(req, res, next) {
  next(createError(404));
});

// Register error handler - default
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Export app to use with www.js - default
module.exports = app;
