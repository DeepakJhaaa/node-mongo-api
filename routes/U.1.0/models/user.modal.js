var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create the Scheme for the Profile Modal
var UserSchema = new Schema({
    picture: String,
    age: Number,
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    phone: String,
    address: {},
    about: String,
    latitude: String,
    longitude: String,
    friends: [],
    type: String,
    dateAdded: { type: Date, default: Date.now },
})

//Export 'Profile' Model so we can interact with it in other files
module.exports = mongoose.model('user', UserSchema);
