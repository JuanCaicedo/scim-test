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

const user = {
  schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
  id: "juan+ssotest12.06.21.5@calm.com",
  userName: "juan+ssotest12.06.21.5@calm.com",
  name: {
    givenName: "Another",
    middleName: "",
    familyName: "User",
  },
  emails: [{ value: "test-email@calm.com" }],
  active: true,
  groups: [],
  meta: {
    resourceType: "User",
  },
};

app.get(["/Users", "/Users/:userId"], (req, res) => {
  const { path, body, query, params } = req;
  console.log("IN GET USERS ID ENDPOINT");
  console.log("path", path);
  console.log("body", body);
  console.log("query", query);
  console.log("params", params);
  if (params?.userId === user.id) {
    return res.status(200).json(user);
  }

  if (params?.userId) {
    const json = {
      schemas: ["urn:ietf:params:scim:api:messages:2.0:Error"],
    };
    return res.status(404).json(json);
  }

  if (
    query?.filter &&
    query.filter !== 'userName eq "juan+ssotest12.06.21.5@calm.com"'
  ) {
    const json = {
      schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
      totalResults: 0,
      startIndex: 1,
      itemsPerPage: 0,
      Resources: [],
    };

    return res.status(200).json(json);
  }

  const json = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    totalResults: 10,
    startIndex: 1,
    itemsPerPage: 0,
    Resources: [user],
  };

  return res.status(200).json(json);
});

app.put("/Users/:userId", (req, res, next) => {
  const { path, body, query, params } = req;
  console.log("IN PUT USERS ID ENDPOINT");
  console.log("path", path);
  console.log("body", body);
  console.log("query", query);
  console.log("params", params);
  res.status(200).json(user);
});

app.put("/Users", (req, res, next) => {
  const { path, body, query } = req;
  console.log("IN PUT USERS ENDPOINT");
  console.log("path", path);
  console.log("body", body);
  console.log("query", query);
  res.status(200).json(user);
});

// app.get("/*", function (req, res, next) {
//   console.log("IN GENERIC GET ENDPOINT");
//   const { path, body, query } = req;
//   console.log("path", path);
//   console.log("body", body);
//   console.log("query", query);
//   const json = {
//     schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
//     totalResults: 25,
//     startIndex: 1,
//     itemsPerPage: 10,
//     Resources: [
//       {
//         schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
//         id: "juan+ssotest12.06.21.5@calm.com",
//         userName: "juan+ssotest12.06.21.5@calm.com",
//         name: {
//           givenName: "Another",
//           middleName: "",
//           familyName: "User",
//         },
//         active: true,
//         groups: [],
//         meta: {
//           resourceType: "User",
//         },
//       },
//     ],
//   };
//   res.status(200).json(json);
// });

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
