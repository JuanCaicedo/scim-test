var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
  const { path, body } = req
  console.log("path", path)
  console.log("body", body)
  const json = {
    schemas: ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
    totalResults: 2,
    Resources: [
      {
        id: "c3a26dd3-27a0-4dec-a2ac-ce211e105f97",
        title: "Assistant VP",
        userName: "andrew.lau@calm.com",
      },
    ],
  };
  res.status(200).json(json);
});

module.exports = router;
