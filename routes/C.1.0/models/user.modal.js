var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Create the Scheme for the Profile Modal
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  dateAdded: { type: Date, default: Date.now }
});

//Export 'Profile' Model so we can interact with it in other files
module.exports = mongoose.model("C10_User", UserSchema);
