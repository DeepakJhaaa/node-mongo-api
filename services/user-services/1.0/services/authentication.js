var jwt = require("jsonwebtoken");
var config = require("../config/config");
var User = require("../models/user.modal");

exports.userLogin = function(req, res) {
  // find the user
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else if (user) {
        // check if password matches
        if (user.password != req.body.password) {
          res.json({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        } else {
          // if user is found and password is right
          // create a token
          var payload = {
            admin: user.admin
          };
          var token = jwt.sign(payload, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.cookie("authToken", token, {
            domain: ".dkjha.com",
            maxAge: 86400
          });
          res.cookie("username", user.username, {
            domain: ".dkjha.com"
          });
          res.cookie("firstName", user.firstName, {
            domain: ".dkjha.com"
          });
          res.cookie("userId", user.id, {
            domain: ".dkjha.com"
          });

          res.json({
            status: "success",
            message: "Successfully logged in.",
            authToken: token,
            username: user.username,
            firstName: user.firstName,
            userId: user._id
          });
        }
      }
    }
  );
};

exports.verify = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secretKey.secret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
};
