var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create the Scheme for the Players
var PlayerSchema = new Schema({
  fname: String,
  lname: String,
  salary: String,
  points: Number,
  rebounds: Number,
  assists: Number,
  steals: Number,
  blocks: Number
});

//Export 'Player' Model so we can interact with it in other files
module.exports = mongoose.model("player", PlayerSchema);
