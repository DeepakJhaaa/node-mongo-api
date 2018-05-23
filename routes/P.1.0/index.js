var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

// Todo Model to Store the Data in MongoDB
var Player = require("./models/player.model.js");

/*
 * POST '/api/new'
 * Receives a POST request of the new Player, saves to db, responds back
 * @param  {Object} req. An object containing the different attributes of the Player
 * @return {Object} JSON
 */
router.post("/api/new", function(req, res) {
  var playerObj = {
    fname: req.body.fname,
    lname: req.body.lname,
    salary: req.body.salary,
    points: req.body.points,
    rebounds: req.body.rebounds,
    assists: req.body.assists,
    steals: req.body.steals,
    blocks: req.body.blocks
  };

  // Create a new Player model instance, passing in the object
  var player = new Player(playerObj);

  // Now, save that 'player' instance to the database
  player.save(function(err, data) {
    if (err) {
      var error = { status: "ERROR", message: "Error saving data." };
      return res.json(error);
    }
    // Now return the json data of the new 'player'
    var jsonData = {
      status: "OK",
      player: data
    };
    return res.json(jsonData);
  });
});

/*
 * GET '/api/get'
 * Receives a GET request to get all Player
 * @return {Object} JSON
 */
router.get("/api/get", function(req, res) {
  Player.find(function(err, data) {
    if (err || data == null) {
      var error = { status: "ERROR", message: "No data found." };
      return res.json(error);
    }

    var jsonData = {
      status: "OK",
      players: data
    };
    return res.json(jsonData);
  });
});

/*
 * POST '/api/update'
 * Receives a POST request with data of the player to update, updates db, responds back
 * @param  {String} req.body.id - The playerId to update
 * @param  {Object} req. An object containing the different attributes of the Player
 * @return {Object} JSON
 */

router.post("/api/update", function(req, res) {
  var playerId = req.body.id;
  var dataToUpdate = {};
  var fname, lname, salary, points, rebounds, assists, steals, blocks;

  // Update any field if it actually in the req.body otherwise, leave it alone.
  if (req.body.fname) {
    fname = req.body.fname;
    dataToUpdate["fname"] = fname;
  }
  if (req.body.lname) {
    lname = req.body.lname;
    dataToUpdate["lname"] = lname;
  }
  if (req.body.salary) {
    salary = req.body.salary;
    dataToUpdate["salary"] = salary;
  }
  if (req.body.points) {
    points = req.body.points;
    dataToUpdate["points"] = points;
  }
  if (req.body.rebounds) {
    rebounds = req.body.rebounds;
    dataToUpdate["rebounds"] = rebounds;
  }
  if (req.body.assists) {
    assists = req.body.assists;
    dataToUpdate["assists"] = assists;
  }
  if (req.body.steals) {
    steals = req.body.steals;
    dataToUpdate["steals"] = steals;
  }
  if (req.body.blocks) {
    blocks = req.body.blocks;
    dataToUpdate["blocks"] = blocks;
  }

  Player.findByIdAndUpdate(playerId, dataToUpdate, function(err, data) {
    if (err) {
      var error = { status: "ERROR", message: "Error updating data" };
      return res.json(error);
    }
    var jsonData = {
      status: "OK",
      player: data
    };
    return res.json(jsonData);
  });
});

/*
 * GET '/api/delete/:id'
 * Receives a GET request specifying the player to delete
 * @param  {String} req.params.id - The playerId
 * @return {Object} JSON
 */
router.get("/api/delete/:id", function(req, res) {
  var playerId = req.params.id;

  Player.findByIdAndRemove(todoId, function(err, data) {
    if (err || data == null) {
      var error = {
        status: "ERROR",
        message: "Could not find that data to delete"
      };
      return res.json(error);
    }
    var jsonData = {
      status: "OK",
      message: "Successfully deleted id: " + requestedId
    };
    res.json(jsonData);
  });
});

module.exports = router;
