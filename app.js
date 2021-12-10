var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/*", function (req, res, next) {
  const { path, body, query } = req;
  console.log("path", path);
  console.log("body", body);
  console.log("query", query);
  const json = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    totalResults: 2,
    Resources: [
      {
        id: "c3a26dd3-27a0-4dec-a2ac-ce211e105f97",
        title: "Assistant VP",
        userName: "andrew.lau@calm.com",
      },
      {
        id: "lololol",
        title: "juan",
        userName: "juan+ssotest12.06.21.5@calm.com",
      },
    ],
  };
  res.status(200).json(json);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
