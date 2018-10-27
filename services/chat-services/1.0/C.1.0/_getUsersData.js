// Import the User Modal for the Further Use
const User = require("./models/user.modal");
// Import the User Modal for the Further Use
const Profile = require("./models/profile.modal");

//========================================
// Registration Route
//========================================

// /**
//  * GET '/api/get'
//  * Receives a GET request to get all animal details
//  * @return {Object} JSON
//  */
exports.getUsers = function(req, res) {
  User.find(function(err, data) {
    //If err or No Profile found, respond with error
    if (err || data == null) {
      var error = { status: "ERROR", message: "Could not find Profile" };
      return res.json(error);
    }

    // otherwise, respond with the data
    var jsonData = {
      status: "OK",
      users_all: data
    };
    res.json(jsonData);
  });
};

// /**
//  * GET '/api/get/:id'
//  * Receives a GET request specifying the animal to get
//  * @param  {String} req.params.id - The animalId
//  * @return {Object} JSON
//  */
exports.getUser = function(req, res) {
  var requestedId = req.params.id;
  User.findById(requestedId, function(err, data) {
    // if err or no user found, respond with error
    console.log(requestedId);
    if (err || data == null) {
      var error = { status: "ERROR", message: "Could not find that User" };
      return res.json(error);
    }
    // otherwise respond with JSON data of the animal
    var jsonData = {
      status: "OK",
      user: data
    };

    return res.json(jsonData);
  });
};

// /**
//  * GET '/api/get/:id'
//  * Receives a GET request specifying the animal to get
//  * @param  {String} req.params.id - The animalId
//  * @return {Object} JSON
//  */
exports.getProfile = function(req, res) {
  // first use req.query to pull out the search query
  var searchTerm = req.query.username;
  console.log("we are searching for " + searchTerm);

  // let's find that animal
  Profile.findOne({ username: searchTerm }, function(err, data) {
    // if err, respond with error
    if (err) {
      var error = { status: "ERROR", message: "Something went wrong" };
      return res.json(error);
    }

    //if no animals, respond with no animals message
    if (data == null || data.length == 0) {
      var message = {
        status: "NO RESULTS",
        message: "We couldn't find any results"
      };
      return res.json(message);
    }

    // otherwise, respond with the data

    var jsonData = {
      status: "OK",
      user: data
    };

    res.json(jsonData);
  });
};

// /**
//  * GET '/api/search'
//  * Receives a GET request to search an animal
//  * @return {Object} JSON
//  */
exports.searchUser = function(req, res) {
  // router.get('/api/search', function (req, res) {

  // first use req.query to pull out the search query
  var searchTerm = req.query.email;
  console.log("we are searching for " + searchTerm);

  // let's find that animal
  User.find({ email: searchTerm }, function(err, data) {
    // if err, respond with error
    if (err) {
      var error = { status: "ERROR", message: "Something went wrong" };
      return res.json(error);
    }

    //if no animals, respond with no animals message
    if (data == null || data.length == 0) {
      var message = {
        status: "NO RESULTS",
        message: "We couldn't find any results"
      };
      return res.json(message);
    }

    // otherwise, respond with the data

    var jsonData = {
      status: "OK",
      result: data
    };

    res.json(jsonData);
  });
};
