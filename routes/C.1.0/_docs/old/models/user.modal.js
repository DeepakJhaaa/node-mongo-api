var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Scheme for the Profile Modal
var UserSchema = new Schema({
    displayName: String,
    email: String,
    phoneNumber: String,
    dateAdded: { type: Date, default: Date.now },
})

//Export 'Profile' Model so we can interact with it in other files
module.exports = mongoose.model('User', UserSchema);