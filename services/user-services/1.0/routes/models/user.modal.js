var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Scheme for the Profile Modal
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    phone: String,
    password: String
});

//Export 'Profile' Model so we can interact with it in other files
module.exports = mongoose.model('ua_user', UserSchema);